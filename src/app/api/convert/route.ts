import { buildOutputFilename, convertFileBuffer } from "@/lib/file-converter";
import { getConversionOption } from "@/lib/conversion-options";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 30 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    const conversionType = form.get("conversionType");

    if (!(file instanceof File)) {
      return Response.json({ error: "파일을 업로드해주세요." }, { status: 400 });
    }

    if (typeof conversionType !== "string") {
      return Response.json({ error: "변환 타입을 선택해주세요." }, { status: 400 });
    }

    const option = getConversionOption(conversionType);
    if (!option) {
      return Response.json({ error: "지원하지 않는 변환 타입입니다." }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(`.${option.input}`)) {
      return Response.json(
        {
          error: `선택한 변환(${option.label})에 맞는 .${option.input} 파일을 업로드해주세요.`,
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json({ error: "파일 크기는 최대 30MB까지 지원합니다." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const converted = await convertFileBuffer({ fileBuffer: buffer, conversionType });
    const outputName = buildOutputFilename(file.name, converted.outputExt);

    return new Response(new Uint8Array(converted.data), {
      status: 200,
      headers: {
        "Content-Type": converted.mime,
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(outputName)}`,
        "X-Conversion-Type": conversionType,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
    return Response.json({ error: message }, { status: 500 });
  }
}

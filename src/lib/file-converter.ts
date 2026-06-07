import libre from "libreoffice-convert";
import { promisify } from "node:util";
import { getConversionOption } from "@/lib/conversion-options";

const libreConvertAsync = promisify<Buffer, string, undefined, Buffer>(libre.convert);

export function buildOutputFilename(inputName: string, outputExt: string) {
  const normalized = inputName.includes(".") ? inputName.slice(0, inputName.lastIndexOf(".")) : inputName;
  return `${normalized}.${outputExt}`;
}

export async function convertFileBuffer(params: {
  fileBuffer: Buffer;
  conversionType: string;
}) {
  const option = getConversionOption(params.conversionType);

  if (!option) {
    throw new Error("지원하지 않는 변환 타입입니다.");
  }

  try {
    const converted = await libreConvertAsync(params.fileBuffer, option.output, undefined);
    return {
      data: converted,
      outputExt: option.output,
      mime: option.mime,
      label: option.label,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (message.toLowerCase().includes("soffice") || message.toLowerCase().includes("libreoffice")) {
      throw new Error(
        "서버에 LibreOffice가 없거나 실행할 수 없습니다. 배포 환경에 LibreOffice(headless)를 설치해주세요.",
      );
    }

    throw new Error(`변환 실패: ${message}`);
  }
}

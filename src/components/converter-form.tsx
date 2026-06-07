"use client";

import { useMemo, useState } from "react";
import { CONVERSION_OPTIONS, type ConversionType } from "@/lib/conversion-options";

function parseFilenameFromDisposition(disposition: string | null) {
  if (!disposition) return null;
  const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1]);
  }
  const fallbackMatch = disposition.match(/filename="?([^";]+)"?/i);
  return fallbackMatch?.[1] ?? null;
}

export function ConverterForm() {
  const [conversionType, setConversionType] = useState<ConversionType>("pptx-pdf");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const selectedOption = useMemo(
    () => CONVERSION_OPTIONS.find((option) => option.value === conversionType) ?? CONVERSION_OPTIONS[0],
    [conversionType],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setMessage("파일을 먼저 선택해주세요.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("conversionType", conversionType);

      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorBody?.error ?? "변환 중 오류가 발생했습니다.");
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      const serverFilename = parseFilenameFromDisposition(contentDisposition);
      const fallbackName = file.name.includes(".") ? file.name.slice(0, file.name.lastIndexOf(".")) : file.name;
      const filename = serverFilename ?? `${fallbackName}.${selectedOption.output}`;

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);

      setMessage(`변환 완료: ${filename}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="space-y-2">
        <label htmlFor="conversionType" className="text-sm font-medium text-slate-700">
          변환 종류
        </label>
        <select
          id="conversionType"
          value={conversionType}
          onChange={(event) => {
            setConversionType(event.target.value as ConversionType);
            setFile(null);
          }}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 transition focus:ring-2"
        >
          {CONVERSION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="file" className="text-sm font-medium text-slate-700">
          업로드 파일 (.{selectedOption.input})
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept={`.${selectedOption.input}`}
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-indigo-700"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !file}
        className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {loading ? "변환 중..." : "파일 변환 및 다운로드"}
      </button>

      <p className="min-h-6 text-sm text-slate-600">{message}</p>
    </form>
  );
}

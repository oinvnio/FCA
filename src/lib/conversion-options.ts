export const CONVERSION_OPTIONS = [
  { value: "pptx-pdf", label: "PPTX → PDF", input: "pptx", output: "pdf", mime: "application/pdf" },
  {
    value: "pdf-pptx",
    label: "PDF → PPTX",
    input: "pdf",
    output: "pptx",
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  { value: "docx-pdf", label: "DOCX → PDF", input: "docx", output: "pdf", mime: "application/pdf" },
  {
    value: "pdf-docx",
    label: "PDF → DOCX",
    input: "pdf",
    output: "docx",
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  { value: "html-pdf", label: "HTML → PDF", input: "html", output: "pdf", mime: "application/pdf" },
  { value: "pdf-html", label: "PDF → HTML", input: "pdf", output: "html", mime: "text/html" },
  {
    value: "hwp-docx",
    label: "HWP → DOCX",
    input: "hwp",
    output: "docx",
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    value: "docx-hwp",
    label: "DOCX → HWP",
    input: "docx",
    output: "hwp",
    mime: "application/x-hwp",
  },
] as const;

export type ConversionOption = (typeof CONVERSION_OPTIONS)[number];
export type ConversionType = ConversionOption["value"];

export function getConversionOption(value: string): ConversionOption | undefined {
  return CONVERSION_OPTIONS.find((option) => option.value === value);
}

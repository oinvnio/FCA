import { db } from "@/db";
import { sql } from "drizzle-orm";
import { ConverterForm } from "@/components/converter-form";

export const dynamic = "force-dynamic";

const openSourceCredits = [
  {
    name: "LibreOffice",
    author: "The Document Foundation and contributors",
    license: "MPL v2.0 / LGPL v3+",
    url: "https://www.libreoffice.org/",
  },
  {
    name: "libreoffice-convert",
    author: "elwerene and contributors",
    license: "MIT",
    url: "https://github.com/elwerene/libreoffice-convert",
  },
  {
    name: "Next.js",
    author: "Vercel and contributors",
    license: "MIT",
    url: "https://nextjs.org/",
  },
];

export default async function HomePage() {
  await db.execute(sql`select 1`);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 px-4 py-10">
      <section className="mx-auto w-full max-w-3xl space-y-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-indigo-600">File Convert App (Prototype)</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">문서 파일 변환기</h1>
          <p className="mt-3 text-sm text-slate-700">
            지원 변환: pptx↔pdf, docx↔pdf, html↔pdf, hwp↔docx. 서버에서 LibreOffice 기반으로 변환을 시도합니다.
          </p>
        </header>

        <ConverterForm />

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Android APK 배포(권장 흐름)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>이 저장소를 GitHub에 push</li>
            <li>웹앱을 배포(Vercel 등) 후 URL 확보</li>
            <li>Capacitor 또는 Trusted Web Activity로 Android 래핑</li>
            <li>GitHub Actions에서 APK 자동 빌드 후 Releases에 업로드</li>
            <li>Android 사용자에게 APK 다운로드 링크만 공유</li>
          </ol>
          <p className="mt-3 text-xs text-slate-500">* 현재 코드는 웹앱 본체입니다. APK 래핑은 별도 Android 프로젝트/워크플로가 필요합니다.</p>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">오픈소스 원작자 표기</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {openSourceCredits.map((credit) => (
              <li key={credit.name}>
                <span className="font-semibold">{credit.name}</span> — {credit.author} ({credit.license}){" "}
                <a href={credit.url} className="text-indigo-600 underline" target="_blank" rel="noreferrer">
                  링크
                </a>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

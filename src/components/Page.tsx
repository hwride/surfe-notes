import { ReactNode } from "react";

export function Page({
  heading,
  headerLinks,
  children,
}: {
  heading: string;
  headerLinks?: { label: string; href: string }[];
  children: ReactNode;
}) {
  return (
    <div className="bg-[#e6eef6]">
      <main className="max-w-180 h-dvh p-8 m-auto flex flex-col">
        <header>
          {headerLinks ? (
            <ol>
              {headerLinks.map(({ label, href }) => (
                <li>
                  <a href={href} className="hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          ) : null}
        </header>
        <h1 className="text-3xl font-bold m-auto text-center mb-8">
          {heading}
        </h1>
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}

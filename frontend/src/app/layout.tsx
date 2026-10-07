import "./globals.css";
export const metadata = {
  title: "RepoWise — Your knowledge, versioned.",
  description:
    "Publish beautiful knowledge directly from your GitHub repository.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import "../../app/globals.css";


export const metadata = {
  title: "Next-Blog Authentication",
  description: "A Next.js build blog-site authentication system.",
};

export default function AuthLayout({ children }) {
  return (
      <div>
        {children}
      </div>
  );
}

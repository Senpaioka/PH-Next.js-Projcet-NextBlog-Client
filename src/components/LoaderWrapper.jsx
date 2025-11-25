"use client";

export default function LoaderWrapper({ loading, size = "md", children }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <span className={`loading loading-spinner loading-${size}`}></span>
      </div>
    );
  }

  return <>{children}</>;
}


// usage:
// import LoaderWrapper from "@/components/LoaderWrapper";
// const [loading, setLoading] = useState(false);
// <LoaderWrapper loading={loading} size="lg"></LoaderWrapper>
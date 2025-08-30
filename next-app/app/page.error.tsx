"use client";
export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div>
      <h2>Failed to load products</h2>
      <p>{error.message}</p>
    </div>
  );
}



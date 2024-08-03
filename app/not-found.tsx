import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <div>존재하지 않는 경로에요 🤣</div>
      <Link
        href="/"
        style={{
          marginTop: "16px",
          color: "#0070f3",
          textDecoration: "none",
        }}
      >
        홈으로 가기
      </Link>
    </div>
  );
}

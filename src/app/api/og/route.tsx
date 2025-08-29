import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = (searchParams.get("title") || "DeskBlue").slice(0, 80);

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #3b82f6, #1e40af)",
            color: "white",
            padding: "64px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "24px",
                fontSize: "40px",
              }}
            >
              💻
            </div>
            <div
              style={{
                fontSize: "48px",
                fontWeight: "800",
                color: "white",
              }}
            >
              DeskBlue
            </div>
          </div>
          
          <h1
            style={{
              fontSize: title.length > 40 ? "48px" : "64px",
              fontWeight: "800",
              textAlign: "center",
              lineHeight: "1.1",
              margin: "0",
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>
          
          <div
            style={{
              fontSize: "24px",
              marginTop: "32px",
              opacity: 0.9,
              textAlign: "center",
            }}
          >
            Simplificando tecnologia para você
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("Erro ao gerar OG image:", error);
    
    // Fallback simples em caso de erro
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#3b82f6",
            color: "white",
            fontSize: "64px",
            fontWeight: "800",
          }}
        >
          DeskBlue
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
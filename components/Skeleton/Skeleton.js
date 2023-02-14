export default function Skeleton() {
    return (
      <div className="skeleton">
        <div className="s-banner"></div>
        <div className="s-header"></div>
        <div className="s-content"></div>
        <div className="s-content"></div>
        <div className="s-content"></div>
  
        <style jsx>{`
          .skeleton {
            max-width: 1200px;
            margin: 20px auto;
          }
          .skeleton > div {
            animation : shimmer 2s infinite linear;
            background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
            background-size: 1000px 100%;
            border-radius: 4px;
            margin: 20px 0;
          }
          .s-banner {
            padding: 12% 0;
          }
          .s-header {
            padding: 15px 0;
            max-width: 500px;
          }
          .s-content {
            padding: 8px 0;
            max-width: 1000px;
          }
          @keyframes shimmer {
            0% {
                background-position: -1000px 0;
            }
            100% {
                background-position: 1000px 0;
            }
        }
        `}</style>
      </div>
    )
  }
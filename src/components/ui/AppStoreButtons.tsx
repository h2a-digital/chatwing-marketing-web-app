import { site } from '@/content/site';
import { Analytics, EVT } from '@/utils/analytics';

export function AppStoreButtons() {
  const handleAppStoreClick = (platform: 'ios' | 'android') => {
    Analytics.instance.capture(EVT.APP_STORE_BUTTON_CLICKED, {
      platform,
      location: 'hero_section',
    });
  };

  return (
    <div className="flex flex-col justify-center gap-4 sm:flex-row sm:justify-start">
      <a
        href={site.store.iosUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        className="inline-flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        onClick={() => handleAppStoreClick('ios')}
      >
        <svg
          className="h-12 w-auto"
          viewBox="0 0 120 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="120" height="40" rx="5" fill="black" />
          <path
            d="M24.769 20.301c-.047-3.225 2.632-4.782 2.751-4.854-1.498-2.19-3.827-2.49-4.661-2.521-1.984-.203-3.872 1.17-4.877 1.17-1.005 0-2.559-1.14-4.207-1.11-2.165.032-4.159 1.26-5.274 3.2-2.247 3.9-.574 9.69 1.615 12.858 1.07 1.55 2.346 3.29 4.02 3.23 1.625-.065 2.238-1.05 4.203-1.05 1.964 0 2.517 1.05 4.222 1.015 1.74-.026 2.848-1.56 3.915-3.115 1.235-1.797 1.744-3.538 1.773-3.628-.039-.016-3.399-1.305-3.449-5.178v-.017z"
            fill="white"
          />
          <path
            d="M22.037 12.211c.89-1.076 1.49-2.574 1.326-4.065-1.281.052-2.832.854-3.75 1.931-.823.953-1.544 2.472-1.352 3.93 1.43.11 2.888-.726 3.776-1.796z"
            fill="white"
          />
          <text
            x="38"
            y="15"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="8"
            fill="white"
          >
            Download on the
          </text>
          <text
            x="38"
            y="28"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="13"
            fontWeight="600"
            fill="white"
          >
            App Store
          </text>
        </svg>
      </a>

      {/* Not published on Google Play */}
      {/* <a
        href={site.store.androidUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get it on Google Play"
        className="inline-flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        onClick={() => handleAppStoreClick('android')}
      >
        <svg
          className="h-12 w-auto"
          viewBox="0 0 135 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="135" height="40" rx="5" fill="black" />
          <path
            d="M7.635 7.794a1.76 1.76 0 00-.398 1.147v22.118c0 .451.142.844.398 1.148l.065.063 12.395-12.395v-.294L7.7 7.731l-.065.063z"
            fill="url(#google-play-gradient-1)"
          />
          <path
            d="M24.228 23.714l-4.133-4.133v-.294l4.138-4.138.093.053 4.898 2.781c1.399.794 1.399 2.096 0 2.895l-4.898 2.782-.098.054z"
            fill="url(#google-play-gradient-2)"
          />
          <path
            d="M24.326 23.66l-4.231-4.232L7.635 31.887c.46.49 1.217.551 2.078.089l14.613-8.317"
            fill="url(#google-play-gradient-3)"
          />
          <path
            d="M24.326 16.34L9.713 8.023c-.86-.462-1.617-.4-2.078.09L20.095 19.57l4.231-4.231z"
            fill="url(#google-play-gradient-4)"
          />
          <defs>
            <linearGradient
              id="google-play-gradient-1"
              x1="19.3"
              y1="9.07"
              x2="5.017"
              y2="23.353"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00A0FF" />
              <stop offset="0.007" stopColor="#00A1FF" />
              <stop offset="0.26" stopColor="#00BEFF" />
              <stop offset="0.512" stopColor="#00D2FF" />
              <stop offset="0.76" stopColor="#00DFFF" />
              <stop offset="1" stopColor="#00E3FF" />
            </linearGradient>
            <linearGradient
              id="google-play-gradient-2"
              x1="30.759"
              y1="19.586"
              x2="6.682"
              y2="19.586"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFE000" />
              <stop offset="0.409" stopColor="#FFBD00" />
              <stop offset="0.775" stopColor="orange" />
              <stop offset="1" stopColor="#FF9C00" />
            </linearGradient>
            <linearGradient
              id="google-play-gradient-3"
              x1="22.42"
              y1="21.791"
              x2="2.288"
              y2="41.923"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3A44" />
              <stop offset="1" stopColor="#C31162" />
            </linearGradient>
            <linearGradient
              id="google-play-gradient-4"
              x1="4.675"
              y1="-1.635"
              x2="14.91"
              y2="8.6"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#32A071" />
              <stop offset="0.069" stopColor="#2DA771" />
              <stop offset="0.476" stopColor="#15CF74" />
              <stop offset="0.801" stopColor="#06E775" />
              <stop offset="1" stopColor="#00F076" />
            </linearGradient>
          </defs>
          <text
            x="42"
            y="14"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="7"
            fill="white"
          >
            GET IT ON
          </text>
          <text
            x="42"
            y="27"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="12"
            fontWeight="600"
            fill="white"
          >
            Google Play
          </text>
        </svg>
      </a> */}
    </div>
  );
}

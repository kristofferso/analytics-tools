export default function TypeFilterIcons({ feature, selected }) {
  return (
    <div className="self-end">
      {feature === "web analytics" && (
        <svg
          className="h-16 w-[7rem]"
          width="42"
          height="28"
          viewBox="0 0 42 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="9"
            y="10"
            width="6"
            height="18"
            rx="2"
            fill="#ddd"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <rect
            y="20"
            width="6"
            height="8"
            rx="2"
            fill="#ddd"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <rect
            x="18"
            y="12"
            width="6"
            height="16"
            rx="2"
            fill="#ddd"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <rect
            x="27"
            y="16"
            width="6"
            height="12"
            rx="2"
            fill="#ddd"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <rect
            x="36"
            y="5"
            width="6"
            height="23"
            rx="2"
            fill="#ddd"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <path
            d="M3 12L11.5 16L21 5L30 8L39 1.5"
            stroke="#666"
            className={`group-hover:stroke-primary-focus ${
              selected && "stroke-primary-focus"
            }`}
          />
          <circle
            cx="12"
            cy="16"
            r="2"
            fill="#666"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
          <circle
            cx="21"
            cy="5"
            r="2"
            fill="#666"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
          <circle
            cx="30"
            cy="8"
            r="2"
            fill="#666"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
          <circle
            cx="39"
            cy="2"
            r="2"
            fill="#666"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
          <circle
            cx="3"
            cy="12"
            r="2"
            fill="#666"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
        </svg>
      )}
      {feature === "all-round analytics" && (
        <svg
          className="h-16 w-24"
          width="30"
          height="23"
          viewBox="0 0 30 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.7935 0.1947C29.9433 0.30223 29.9775 0.510819 29.87 0.660597L28.7863 2.17001C28.676 2.32366 28.742 2.54016 28.9193 2.60615L29.9752 2.99928C30.443 3.17343 30.7532 3.61997 30.7532 4.1191C30.7532 5.0533 29.7294 5.6262 28.9332 5.13751L28.4392 4.83431C28.0539 4.59782 27.5567 4.86482 27.5411 5.31663C27.5307 5.61564 27.7458 5.87506 28.0416 5.92022L29.2075 6.0982C29.7343 6.17863 30.1398 6.60575 30.1928 7.1361C30.2926 8.13585 29.1667 8.78625 28.3506 8.2003L28.2893 8.15635C28.0789 8.00529 27.7888 8.03542 27.6139 8.22651C27.3831 8.4787 27.46 8.88197 27.7674 9.03155L29.258 9.75691C29.5589 9.90333 29.779 10.1762 29.8584 10.5012C30.0559 11.3102 29.3362 12.0458 28.5231 11.8659L28.1735 11.7885C27.7895 11.7036 27.4138 11.9612 27.3547 12.3501L26.0768 20.7653L25.4166 20.665L26.6946 12.2498C26.8116 11.479 27.5565 10.9682 28.3177 11.1366L28.6673 11.214C28.9976 11.287 29.29 10.9883 29.2097 10.6596C29.1775 10.5276 29.0881 10.4168 28.9659 10.3573L27.4752 9.63194C26.7664 9.28704 26.5892 8.3572 27.1213 7.77572C27.5246 7.33513 28.1936 7.26564 28.6787 7.61396L28.74 7.65791C29.0893 7.90868 29.5711 7.63032 29.5284 7.20245C29.5057 6.97547 29.3322 6.79268 29.1067 6.75825L27.9408 6.58027C27.3103 6.48401 26.8517 5.93096 26.8738 5.29349C26.9072 4.3303 27.9671 3.76109 28.7885 4.26525L29.2825 4.56846C29.6338 4.78407 30.0855 4.5313 30.0855 4.11911C30.0855 3.89889 29.9486 3.70186 29.7422 3.62502L28.6863 3.23189C28.0964 3.01228 27.8769 2.2919 28.2439 1.78061L29.3276 0.271197C29.4351 0.121419 29.6437 0.0871702 29.7935 0.1947Z"
            fill="#666"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
          <path
            d="M20.6353 0.691876C20.8547 0.610403 24.3417 6.60633 24.7796 7.78601L28.698 16.7669C29.1358 17.9466 28.5344 19.2579 27.3548 19.6957C26.1751 20.1336 24.8638 19.5322 24.426 18.3525L19.1407 4.11253C18.7028 2.93285 19.4556 1.12973 20.6353 0.691876Z"
            fill="#c2c2c2"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <path
            d="M1.0878 18.4938C1.0878 16.2812 2.88144 14.4876 5.094 14.4876H25.125C27.3376 14.4876 29.1312 16.2812 29.1312 18.4938C29.1312 20.7064 27.3376 22.5 25.125 22.5H5.094C2.88144 22.5 1.0878 20.7064 1.0878 18.4938Z"
            fill="#c2c2c2"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <path
            d="M15.5802 3.88166L3.47547 20.3117C1.00007 18.8667 0.787147 16.7655 1.72436 15.4566L9.76791 4.47211C10.4519 3.55517 13.2961 1.45371 15.5802 3.88166Z"
            fill="#c2c2c2"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <path
            d="M1.0878 17.8261C1.0878 15.6136 2.88144 13.8199 5.094 13.8199H25.125C27.3376 13.8199 29.1312 15.6136 29.1312 17.8261C29.1312 20.0387 27.3376 21.8323 25.125 21.8323H5.094C2.88144 21.8323 1.0878 20.0387 1.0878 17.8261Z"
            fill="#666"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
          <circle cx="25.125" cy="17.8261" r="1.3354" fill="white" />
          <circle cx="5.09401" cy="17.8261" r="1.3354" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.4353 4.20067C13.5852 4.30802 13.6197 4.51657 13.5124 4.66648L8.4588 11.7238C8.35145 11.8737 8.14291 11.9082 7.993 11.8008C7.84309 11.6935 7.80858 11.4849 7.91593 11.335L12.9695 4.27774C13.0769 4.12783 13.2854 4.09333 13.4353 4.20067Z"
            fill="white"
          />
        </svg>
      )}
      {feature === "product analytics" && (
        <svg
          className="h-16 w-32"
          width="52"
          height="23"
          viewBox="0 0 52 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.7143 10.6977H31.3061C33.2463 10.6977 34.58 11.0787 35.6572 11.9577C36.1501 12.36 36.5301 12.8203 36.8488 13.2296C36.9536 13.3642 37.0506 13.4914 37.1451 13.6155C37.3609 13.8987 37.5643 14.1657 37.8209 14.4673C38.5445 15.3184 39.0814 15.7752 39.7814 16.0711C40.5222 16.3842 41.601 16.5814 43.5102 16.5814H45.102V19.7907H43.5102C41.4398 19.7907 39.8656 19.5867 38.5502 19.0307C37.1941 18.4574 36.2719 17.577 35.4036 16.5559C35.088 16.1847 34.8029 15.8107 34.5702 15.5055C34.4881 15.3978 34.4126 15.2986 34.3445 15.2112C34.058 14.8432 33.8576 14.6183 33.654 14.4522C33.3384 14.1946 32.8149 13.907 31.3061 13.907H29.7143V10.6977Z"
            fill="#DDDDDD"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.9592 5.34883H9.55103C11.679 5.34883 13.8805 5.64851 16.2585 7.21482C17.2067 7.83935 17.824 8.14039 18.4587 8.31211C19.1146 8.48958 19.8949 8.55813 21.2245 8.55813H22.8163V11.7674H21.2245C19.8303 11.7674 18.7073 11.7023 17.6334 11.4117C16.5382 11.1154 15.599 10.6141 14.517 9.90145C12.8347 8.79334 11.3142 8.55813 9.55103 8.55813H7.9592V5.34883Z"
            fill="#DDDDDD"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.9796 3.47675H30.7755C32.6875 3.47675 34.7534 4.03322 36.7209 5.40162C37.2116 5.74292 37.6993 6.14736 38.1684 6.53782L38.2148 6.5765C38.6769 6.9612 39.1259 7.33509 39.5894 7.6714C40.5529 8.37069 41.4718 8.82558 42.449 8.82558H43.2449V10.4302H42.449C40.9693 10.4302 39.7138 9.73895 38.6593 8.97367C38.1519 8.60542 37.6662 8.20102 37.215 7.8253C37.1949 7.80851 37.1748 7.79177 37.1547 7.7751C36.6772 7.37756 36.2417 7.01788 35.8169 6.72242C34.1222 5.54375 32.3732 5.0814 30.7755 5.0814H29.9796V3.47675Z"
            fill="#DDDDDD"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30.5102 8.55814H31.3061C32.9836 8.55814 34.4352 8.85299 36.8639 9.66908C37.3875 9.84502 37.7904 9.98889 38.1252 10.1084C38.5972 10.277 38.9338 10.3971 39.2822 10.4907C39.8125 10.633 40.3334 10.6977 41.3877 10.6977H42.1837V12.3023H41.3877C40.2609 12.3023 39.5879 12.2333 38.8727 12.0413C38.4724 11.9339 38.0393 11.7799 37.5026 11.589C37.1679 11.47 36.793 11.3367 36.3605 11.1914C34.0137 10.4028 32.7445 10.1628 31.3061 10.1628H30.5102V8.55814Z"
            fill="#DDDDDD"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.02042 0H28.6531V4.81395H9.02042V0Z"
            fill="#DDDDDD"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.1224 0H46.4286V3.2093H28.1224V0Z"
            fill="#DDDDDD"
            className={`group-hover:fill-purple-300 ${
              selected && "fill-purple-300"
            }`}
          />
          <rect
            width="10.6122"
            height="10.6977"
            rx="1"
            fill="#AAAAAA"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
          <rect
            x="20.6939"
            width="10.6122"
            height="7.48837"
            rx="1"
            fill="#AAAAAA"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
          <rect
            x="41.3878"
            width="10.6122"
            height="7.48837"
            rx="1"
            fill="#AAAAAA"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
          <rect
            x="41.3878"
            y="8.55814"
            width="10.6122"
            height="4.27907"
            rx="1"
            fill="#AAAAAA"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
          <rect
            x="41.3878"
            y="16.5814"
            width="10.6122"
            height="6.4186"
            rx="1"
            fill="#AAAAAA"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
          <rect
            x="20.6939"
            y="8.55814"
            width="10.6122"
            height="7.48837"
            rx="1"
            fill="#AAAAAA"
            className={`group-hover:fill-primary-focus ${
              selected && "fill-primary-focus"
            }`}
          />
        </svg>
      )}
    </div>
  );
}

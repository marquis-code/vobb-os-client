const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "src/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        "vobb-neutral": {
          100: "var(--neutral-100)",
          90: "var(--neutral-90)",
          80: "var(--neutral-80)",
          70: "var(--neutral-70)",
          60: "var(--neutral-60)",
          50: "var(--neutral-50)",
          40: "var(--neutral-40)",
          30: "var(--neutral-30)",
          20: "var(--neutral-20)",
          10: "var(--neutral-10)",
          0: "var(--neutral-0)"
        },
        "vobb-primary": {
          100: "var(--vobb-primary-100)",
          90: "var(--vobb-primary-90)",
          80: "var(--vobb-primary-80)",
          70: "var(--vobb-primary-70)",
          60: "var(--vobb-primary-60)",
          50: "var(--vobb-primary-50)",
          40: "var(--vobb-primary-40)",
          30: "var(--vobb-primary-30)",
          20: "var(--vobb-primary-20)",
          10: "var(--vobb-primary-10)",
          0: "var(--vobb-primary-0)"
        },
        "vobb-sec": {
          100: "var(--vobb-sec-100)",
          90: "var(--vobb-sec-90)",
          80: "var(--vobb-sec-80)",
          70: "var(--vobb-sec-70)",
          60: "var(--vobb-sec-60)",
          50: "var(--vobb-sec-50)",
          40: "var(--vobb-sec-40)",
          30: "var(--vobb-sec-30)",
          20: "var(--vobb-sec-20)",
          10: "var(--vobb-sec-10)",
          0: "var(--vobb-sec-0)"
        },
        error: {
          50: "var(--error-50)",
          40: "var(--error-40)",
          30: "var(--error-30)",
          20: "var(--error-20)",
          10: "var(--error-10)",
          0: "var(--error-0)"
        },
        success: {
          50: "var(--success-50)",
          40: "var(--success-40)",
          30: "var(--success-30)",
          20: "var(--success-20)",
          10: "var(--success-10)",
          0: "var(--success-0)"
        },
        warning: {
          50: "var(--warning-50)",
          40: "var(--warning-40)",
          30: "var(--warning-30)",
          20: "var(--warning-20)",
          10: "var(--warning-10)",
          0: "var(--warning-0)"
        },
        info: {
          50: "var(--info-50)",
          40: "var(--info-40)",
          30: "var(--info-30)",
          20: "var(--info-20)",
          10: "var(--info-10)",
          0: "var(--info-0)"
        }
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        inter: ["Inter", ...fontFamily.sans],
        workSans: ["Work Sans", ...fontFamily.sans]
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite"
      },
      backgroundImage: {
        "circle-pattern": "url('/src/assets/vectors/illustrations/circles.svg')"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

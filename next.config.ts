import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*"
            }
        ]
    },
    // experimental:{
    //     ppr:"incremental",
    // },
    devIndicators: {
        position: "bottom-right",
    }
    /* config options here */
};

export default nextConfig;

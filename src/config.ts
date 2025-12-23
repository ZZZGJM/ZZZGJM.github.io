import type {
	ExpressiveCodeConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "精选商城",
	subtitle: "发现优质商品，享受便捷购物体验",
	lang: "zh_CN",
	themeColor: {
		hue: 200,
		fixed: false,
	},
	banner: {
		enable: true,
		src: [
			{
				src: "https://t.alcy.cc/moez",
			},
		],
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: false,
		depth: 2,
	},
	favicon: [],
};

export const navBarConfig: NavBarConfig = {
	links: [LinkPreset.Home],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/demo-avatar.jpg",
	name: "精选商城",
	bio: "发现优质商品，享受便捷购物体验",
	links: [],
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

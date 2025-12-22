export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	secretContent?: string; // 支付成功后显示的私密信息
};

export type PaymentMethod = "wechat" | "alipay";

export type Order = {
	id: string;
	productId: string;
	productName: string;
	price: number;
	paymentMethod: PaymentMethod;
	status: "pending" | "paid" | "failed";
	createdAt: Date;
	paidAt?: Date;
};


<script lang="ts">
	import { Icon } from "astro-icon/components";
	import type { PaymentMethod, Product } from "../types/product";

	export let product: Product;
	let isOpen = $state(false);
	let selectedPayment: PaymentMethod = $state("wechat");

	let showQRCode = $state(false);
	let isProcessing = $state(false);
	let paymentSuccess = $state(false);
	let countdown = $state(0);

	// 生成二维码URL（使用在线二维码生成服务）
	function getQRCodeUrl(method: PaymentMethod): string {
		const amount = product.price.toFixed(2);
		if (method === "wechat") {
			// 微信支付二维码（模拟）
			return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=weixin://wxpay/bizpayurl?pr=${encodeURIComponent(`demo_${Date.now()}`)}`;
		} else {
			// 支付宝二维码（模拟）
			return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=alipays://platformapi/startapp?saId=10000007&qrcode=${encodeURIComponent(`https://qr.alipay.com/demo_${Date.now()}`)}`;
		}
	}

	function openModal() {
		isOpen = true;
		showQRCode = false;
		paymentSuccess = false;
		document.body.style.overflow = "hidden";
	}

	function closeModal() {
		if (!isProcessing && !showQRCode) {
			isOpen = false;
			document.body.style.overflow = "";
			showQRCode = false;
			paymentSuccess = false;
		}
	}

	function selectPayment(method: PaymentMethod) {
		if (!showQRCode) {
			selectedPayment = method;
		}
	}

	async function handlePayment() {
		showQRCode = true;
		isProcessing = true;
		countdown = 0;
		
		// 模拟支付倒计时（实际应该是等待用户扫码支付）
		const timer = setInterval(() => {
			countdown++;
			if (countdown >= 3) {
				clearInterval(timer);
				// 模拟支付成功
				isProcessing = false;
				paymentSuccess = true;
				
				// 3秒后跳转到成功页面
				setTimeout(() => {
					window.location.href = `/payment-success?orderId=${Date.now()}&productId=${product.id}`;
				}, 3000);
			}
		}, 1000);
	}

	function cancelPayment() {
		if (showQRCode && !paymentSuccess) {
			showQRCode = false;
			isProcessing = false;
			countdown = 0;
		}
	}

	// 监听外部点击关闭
	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget && !isProcessing && !showQRCode) {
			closeModal();
		}
	}

	// 监听自定义事件来打开弹窗
	$effect(() => {
		const handleOpen = () => {
			openModal();
		};
		document.addEventListener("openPaymentModal", handleOpen);
		return () => {
			document.removeEventListener("openPaymentModal", handleOpen);
		};
	});

	// 暴露方法给外部调用
	export { openModal, closeModal };
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
		onclick={handleBackdropClick}
		role="dialog"
		aria-modal="true"
	>
		<div class="card-base relative max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
			<!-- 关闭按钮 -->
			<button
				onclick={closeModal}
				disabled={isProcessing}
				class="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--btn-plain-bg-hover)] transition-colors disabled:opacity-50"
				aria-label="关闭"
			>
				<Icon name="material-symbols:close-rounded" class="text-2xl"></Icon>
			</button>

			{#if !paymentSuccess}
				{#if !showQRCode}
					<!-- 支付表单 -->
					<div class="p-6">
						<h2 class="text-2xl font-bold mb-2 text-[var(--primary)]">确认订单</h2>
						<div class="mb-6">
							<div class="flex items-center gap-3 p-4 bg-[var(--card-bg)] rounded-lg mb-4">
								<div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
									<img src={product.image} alt={product.name} class="w-full h-full object-cover" />
								</div>
								<div class="flex-1 min-w-0">
									<h3 class="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
									<p class="text-2xl font-bold text-[var(--primary)]">¥{product.price.toFixed(2)}</p>
								</div>
							</div>
						</div>

						<!-- 支付方式选择 -->
						<div class="mb-6">
							<h3 class="text-lg font-semibold mb-3">选择支付方式</h3>
							<div class="space-y-3">
								<button
									onclick={() => selectPayment("wechat")}
									class:list={[
										"w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4",
										selectedPayment === "wechat"
											? "border-[var(--primary)] bg-[var(--primary)]/10"
											: "border-[var(--line-color)] hover:border-[var(--primary)]/50",
									]}
								>
									<div
										class:list={[
											"w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
											selectedPayment === "wechat"
												? "border-[var(--primary)] bg-[var(--primary)]"
												: "border-[var(--line-color)]",
										]}
									>
										{#if selectedPayment === "wechat"}
											<div class="w-2 h-2 rounded-full bg-white"></div>
										{/if}
									</div>
									<div class="flex items-center gap-3 flex-1">
										<div class="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
											<span class="text-white font-bold text-lg">微</span>
										</div>
										<span class="font-medium">微信支付</span>
									</div>
								</button>

								<button
									onclick={() => selectPayment("alipay")}
									class:list={[
										"w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4",
										selectedPayment === "alipay"
											? "border-[var(--primary)] bg-[var(--primary)]/10"
											: "border-[var(--line-color)] hover:border-[var(--primary)]/50",
									]}
								>
									<div
										class:list={[
											"w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
											selectedPayment === "alipay"
												? "border-[var(--primary)] bg-[var(--primary)]"
												: "border-[var(--line-color)]",
										]}
									>
										{#if selectedPayment === "alipay"}
											<div class="w-2 h-2 rounded-full bg-white"></div>
										{/if}
									</div>
									<div class="flex items-center gap-3 flex-1">
										<div class="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
											<span class="text-white font-bold text-lg">支</span>
										</div>
										<span class="font-medium">支付宝</span>
									</div>
								</button>
							</div>
						</div>

						<!-- 支付按钮 -->
						<button
							onclick={handlePayment}
							disabled={isProcessing}
							class="w-full py-4 rounded-lg bg-[var(--primary)] text-white font-semibold text-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
						>
							确认支付 ¥{product.price.toFixed(2)}
						</button>
					</div>
				{:else}
					<!-- 二维码支付页面 -->
					<div class="p-6 text-center">
						<div class="mb-4">
							<div class="flex items-center justify-center gap-2 mb-2">
								{#if selectedPayment === "wechat"}
									<div class="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
										<span class="text-white font-bold">微</span>
									</div>
									<h2 class="text-xl font-bold text-[var(--primary)]">微信支付</h2>
								{:else}
									<div class="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
										<span class="text-white font-bold">支</span>
									</div>
									<h2 class="text-xl font-bold text-[var(--primary)]">支付宝</h2>
								{/if}
							</div>
							<p class="text-75 text-sm">请使用{selectedPayment === "wechat" ? "微信" : "支付宝"}扫描下方二维码完成支付</p>
						</div>

						<!-- 二维码 -->
						<div class="mb-6 flex flex-col items-center">
							<div class="p-4 bg-white rounded-lg border-2 border-[var(--line-color)] mb-4">
								<img
									src={getQRCodeUrl(selectedPayment)}
									alt="支付二维码"
									class="w-48 h-48"
								/>
							</div>
							<div class="flex items-center gap-2 text-sm text-75">
								<Icon name="material-symbols:info-outline-rounded" class="text-lg"></Icon>
								<span>支付金额：<span class="font-bold text-[var(--primary)]">¥{product.price.toFixed(2)}</span></span>
							</div>
						</div>

						<!-- 支付状态 -->
						{#if isProcessing}
							<div class="mb-4">
								<div class="flex items-center justify-center gap-2 text-[var(--primary)]">
									<div class="w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
									<span class="font-medium">等待支付中...</span>
								</div>
							</div>
						{/if}

						<!-- 取消按钮 -->
						<button
							onclick={cancelPayment}
							disabled={isProcessing}
							class="w-full py-3 rounded-lg border-2 border-[var(--line-color)] text-75 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							取消支付
						</button>
					</div>
				{/if}
			{:else}
				<!-- 支付成功提示 -->
				<div class="p-6 text-center">
					<div class="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
						<Icon name="material-symbols:check-circle-rounded" class="text-white text-5xl"></Icon>
					</div>
					<h2 class="text-2xl font-bold mb-2 text-[var(--primary)]">支付成功！</h2>
					<p class="text-75 mb-4">正在跳转到订单详情页面...</p>
					<div class="w-8 h-8 mx-auto border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	:global(body:has(.payment-modal-open)) {
		overflow: hidden;
	}
</style>


import Navbar from "../../components/navbar";
import Faq from "./faqs";
import Features from "./features";
import Hero from "./hero";
import Payment from "./payment";
import leftwave from "../../assets/wave left.svg";
import rightwave from "../../assets/wave right.svg";
import Footer from "@/components/footer";

const Home = () => {
	return (
		<main>
			<div className='min-h-screen bg-white container mx-auto lg:px-20 px-5'>
				<Navbar />
				<Hero />
				<Features />
			</div>

			<Payment />

			<section className='relative overflow-y-hidden'>
				<div className='container mx-auto lg:px-20 px-5'>
					<Faq />
				</div>

				<img
					src={leftwave}
					className='absolute lg:h-auto h-24 left-0 -bottom-6'
					alt=''
				/>
				<img
					src={rightwave}
					className='absolute lg:h-auto h-24 right-0 -bottom-6'
					alt=''
				/>
			</section>

			<Footer />
		</main>
	);
};

export default Home;


// Naples!1


<WagmiProvider config={config}>
	<QueryClientProvider client={queryClient}>
		<RainbowKitProvider>{/* Your App */}</RainbowKitProvider>
	</QueryClientProvider>
</WagmiProvider>;
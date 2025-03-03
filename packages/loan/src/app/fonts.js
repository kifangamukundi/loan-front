import { Lora, Montserrat, Poppins, Roboto } from 'next/font/google'

const lora = Lora({ subsets: ['latin'], display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '700', '900'] });
const roboto = Roboto({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '700', '900'] });

export const loraFont = lora.className;
export const montserratFont = montserrat.className;
export const poppinsFont = poppins.className;
export const robotoFont = roboto.className;
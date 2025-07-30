import React from 'react'
import AppImages from '@/config/constant/app.images';
import StockTable from '@/components/ui/table/StockListTable';
import { Stock } from "@/types/stock";

export default function StockList() {
    const data: Stock[] = [
        {
            name: "Paytm",
            logo: AppImages.coins.comlist1,
            nameLink: "/share",
            unlistedPrice: "₹ 800-3500",
            ipoPrice: "₹ 2150",
            cmp: "₹ 1072.3",
            gainLoss: -50.13,
        },
        {
            name: "Nazara Tech",
            logo: AppImages.coins.comlist2,
            nameLink: "/share",
            unlistedPrice: "₹ 200-750",
            ipoPrice: "₹ 550",
            cmp: "₹ 1338.1",
            gainLoss: 143.29,
        },
        {
            name: "Barbeque Nation",
            logo: AppImages.coins.comlist3,
            nameLink: "/share",
            unlistedPrice: "₹ 510-1000",
            ipoPrice: "₹ 500",
            cmp: "₹ 302.8",
            gainLoss: -39.44,
        },
        {
            name: "CSB",
            logo: AppImages.coins.comlist4,
            nameLink: "/share",
            unlistedPrice: "₹ 150-210",
            ipoPrice: "₹ 195",
            cmp: "₹ 424.15",
            gainLoss: 117.51,
        },
        {
            name: "AGS Transact",
            logo: AppImages.coins.comlist5,
            nameLink: "/share",
            unlistedPrice: "₹ 225-575",
            ipoPrice: "₹ 175",
            cmp: "₹ 4.9",
            gainLoss: -97.2,
        },
        {
            name: "Anand Rathi Wealth Services",
            logo: AppImages.coins.comlist6,
            nameLink: "/share",
            unlistedPrice: "₹ 175-400",
            ipoPrice: "₹ 275",
            cmp: "₹ 2660.1",
            gainLoss: 867.31,
        },
        {
            name: "Aptus Value Housing Finance",
            logo: AppImages.coins.comlist7,
            nameLink: "/share",
            unlistedPrice: "₹ 350-420",
            ipoPrice: "₹ 353",
            cmp: "₹ 330.65",
            gainLoss: -6.33,
        },
        {
            name: "Suryoday SFB",
            logo: AppImages.coins.comlist8,
            nameLink: "/share",
            unlistedPrice: "₹ 175-350",
            ipoPrice: "₹ 305",
            cmp: "₹ 128.76",
            gainLoss: -57.78,
        },
        {
            name: "UTI AMC",
            logo: AppImages.coins.comlist9,
            nameLink: "/share",
            unlistedPrice: "₹ 750-1100",
            ipoPrice: "₹ 554",
            cmp: "₹ 1321.3",
            gainLoss: 138.5,
        },
        {
            name: "Delhivery",
            logo: AppImages.coins.comlist10,
            nameLink: "/share",
            unlistedPrice: "₹ 650-900",
            ipoPrice: "₹ 487",
            cmp: "₹ 427.1",
            gainLoss: -12.3,
        },
        {
            name: "Zomato",
            logo: AppImages.coins.comlist11,
            nameLink: "/share",
            unlistedPrice: "₹ 200-400",
            ipoPrice: "₹ 76",
            cmp: "₹ 132.1",
            gainLoss: 73.82,
        },
        {
            name: "Nykaa",
            logo: AppImages.coins.comlist12,
            nameLink: "/share",
            unlistedPrice: "₹ 250-600",
            ipoPrice: "₹ 1125",
            cmp: "₹ 145.5",
            gainLoss: -87.07,
        },
    ];
    return (
        <StockTable data={data} />
    )
}

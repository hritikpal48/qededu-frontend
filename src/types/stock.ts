export type Stock = {
    name: string;
    logo: string;
    unlistedPrice: string;
    ipoPrice: string;
    cmp: string;
    gainLoss: number;
    nameLink: string;
};

export type GetStockListApiParams = {
    limit: number;
    page: number;
    keyword: string
}

export type StockFundamental = {
    infra_market: string;
    private_limted_price: string;
    lot_size: string;
    high_52_week: string;
    low_52_week: string;
    depository: string;
    pan_number: string;
    isin_number: string;
    cin: string;
    rta: string;
    market_cap: string;
    p_e_ration: string;
    p_b_ration: string;
    debt_to_equity: string;
    roe: string;
    book_value: string;
    face_value: string;
    total_share: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}
export type StockData = {
    _id: string;
    name: string;
    image: string;
    price: number;
    about: string;
    fundamentals: StockFundamental
    isDelete: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export type StockListApiRespone = {
    data: StockData[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface urlParams {
    params: Promise<{ section: string }>;
}

export async function GET(req: Request, { params }: urlParams) {
    const section = (await params).section;
    const { searchParams } = new URL(req.url);
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.max(Number(searchParams.get("limit")) || 10, 1);

    try {
        const where = { section: { equals: section, mode: "insensitive" as const }, isActive: true };

        const total_products_count = await prisma.products.count({ where });
        const total_pages = Math.ceil(total_products_count / limit);

        const products = await prisma.products.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
        });

        return NextResponse.json({
            products,
            pagination: {
                page,
                limit,
                total_pages,
                total_products_count,
                hasNextPage: page < total_pages,
                hasPreviousPage: page > 1,
            },
        });
    } catch (err) {
        const error = (err as Error).message;
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

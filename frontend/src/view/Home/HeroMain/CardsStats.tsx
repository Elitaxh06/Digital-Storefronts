import React from "react"
type Props = {
    svg : React.ReactNode,
    stat : string,
    text: string,
    textColor : string,
    bgColor: string
}

export default function CardsStats({svg, stat, text, textColor, bgColor}: Props) {
    return(
        <div className="flex flex-col gap-3 items-center shadow-md hover:shadow-lg rounded-2xl hover:-translate-y-2 border border-slate-200 transition-transform duration-200 w-[12em] h-[11em]">
            <span className={`rounded-full p-4 mt-2 ${bgColor}`}>
                {svg}
            </span>
            <p className="font-bold text-3xl">{stat}</p>
            <p className={`text-md font-semibold ${textColor}`}>{text}</p>
        </div>

    )
}


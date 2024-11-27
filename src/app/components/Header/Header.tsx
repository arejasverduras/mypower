'use client'
import { useState } from "react";

export const HeaderJara = () => {
    const [headerColor, setHeaderColor ]= useState('black');

    


    return (
        
            <div className="border">Header, color = {headerColor}</div>
        
        
    )
}
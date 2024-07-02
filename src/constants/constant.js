// create constant for state with there statecode
import { BarChart, Dashboard, MiscellaneousServices, PointOfSale, ShoppingCartCheckout } from "@mui/icons-material";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
export const state = {
    statecode: [
        { code: "01", name: "Jammu and Kashmir" },
        { code: "02", name: "Himachal Pradesh" },
        { code: "03", name: "Punjab" },
        { code: "04", name: "Chandigarh" },
        { code: "05", name: "Uttarakhand" },
        { code: "06", name: "Haryana" },
        { code: "07", name: "Delhi" },
        { code: "08", name: "Rajasthan" },
        { code: "09", name: "Uttar Pradesh" },
        { code: "10", name: "Bihar" },
        { code: "11", name: "Sikkim" },
        { code: "12", name: "Arunachal Pradesh" },
        { code: "13", name: "Nagaland" },
        { code: "14", name: "Manipur" },
        { code: "15", name: "Mizoram" },
        { code: "16", name: "Tripura" },
        { code: "17", name: "Meghalaya" },
        { code: "18", name: "Assam" },
        { code: "19", name: "West Bengal" },
        { code: "20", name: "Jharkhand" },
        { code: "21", name: "Odisha" },
        { code: "22", name: "Chhattisgarh" },
        { code: "23", name: "Madhya Pradesh" },
        { code: "24", name: "Gujarat" },
        { code: "25", name: "Daman and Diu" },
        { code: "26", name: "Dadra and Nagar Haveli" },
        { code: "27", name: "Maharashtra" },
        { code: "29", name: "Karnataka" },
        { code: "30", name: "Goa" },
        { code: "31", name: "Lakshadweep" },
        { code: "32", name: "Kerala" },
        { code: "33", name: "Tamil Nadu" },
        { code: "34", name: "Puducherry" },
        { code: "35", name: "Andaman and Nicobar Islands" },
        { code: "36", name: "Telangana" },
        { code: "37", name: "Andhra Pradesh" },
        { code: "97", name: "Other Territory" },
        { code: "96", name: "Other Country" },
    ]
    }

    export const MenuItems = [
        {
            title: "Dashboard",
            url: "/",
            cName: "nav-links",
            icon: "Dashboard",
        
        },
        {
            title: "Masters",
            url: "/masters",
            cName: "nav-links",
            icon: "AppSettingsAltIcon",
            sub_menu: [
                {
                    title: "Order",
                    url: "/masters/order",
                    cName: "nav-links",
                    icon: "Order",
                },
                {
                    title: "Goods Receive",
                    url: "/masters/goods-receive",
                    cName: "nav-links",
                    icon: "Goods",
                },
                {
                    title: "Goods Return",
                    url: "/masters/goods-return",
                    cName: "nav-links",
                    icon: "Goods",
                },
            ],
        },
        {
            title: "Sales",
            url: "/sales",
            cName: "nav-links",
            icon: "PointOfSale",
            sub_menu: [
                {
                    title: "Invoice",
                    url: "/sales/invoice",
                    cName: "nav-links",
                    icon: "Invoice",
                },
                {
                    title: "Estimate",
                    url: "/sales/estimate",
                    cName: "nav-links",
                    icon: "Estimate",
                },
                {
                    title: "Order",
                    url: "/sales/order",
                    cName: "nav-links",
                    icon: "Order",
                }
                
            ],
        },
        {
            title: "Item",
            url: "/item",
            cName: "nav-links",
            icon: "item",
            sub_menu:[
                {
                    title: "Items",
                    url: "/items",
                    cName: "nav-links",
                    icon: "Items",
                },
                {
                    title: "Category",
                    url: "/items/category",
                    cName: "nav-links",
                    icon: "Category",
                },
                {
                    title: "Brand",
                    url: "/items/brand",
                    cName: "nav-links",
                    icon: "Brand",
                },
                {
                    title: "Unit",
                    url: "/items/unit",
                    cName: "nav-links",
                    icon: "Unit",

                },
                {
                    title: "HSN/SAC",
                    url: "/items/hsn",
                    cName: "nav-links",
                    icon: "HSN",
                }
                
                
            
            ]


        },
        {
            title: "Misc",
            url: "/misc",
            cName: "nav-links",
            icon: "MiscellaneousServices",
            sub_menu: [
                {
                    title: "Customer",
                    url: "/misc/customer",
                    cName: "nav-links",
                    icon: "Customer",
                },
                {
                    title: "Supplier",
                    url: "/misc/supplier",
                    cName: "nav-links",
                    icon: "Supplier",
                },
               
                {
                    title: "Tax",
                    url: "/misc/tax",
                    cName: "nav-links",
                    icon: "Tax",
                }
            ]
        },
        {
            title: "Purchase",
            url: "/purchase",
            cName: "nav-links",
            icon: "ShoppingCartCheckout",
            sub_menu: [
                {
                    title: "Purchase Order",
                    url: "/purchase/purchase-order",
                    cName: "nav-links",
                    icon: "PurchaseOrder",
                },
                {
                    title: "Purchase Entry",
                    url: "/purchase/purchase-entry",
                    cName: "nav-links",
                    icon: "Purchase",
                },
                
            ]
        },
        {
            title: "Reports",
            url: "/reports",
            cName: "nav-links",
            icon: "BarChart",
            sub_menu: [
                {
                    title: "Sales Report",
                    url: "/reports/sales-report",
                    cName: "nav-links",
                    icon: "SalesReport",
                },
                {
                    title: "Purchase Report",
                    url: "/reports/purchase-report",
                    cName: "nav-links",
                    icon: "PurchaseReport",
                },
                {
                    title: "Stock Report",
                    url: "/reports/stock-report",
                    cName: "nav-links",
                    icon: "StockReport",
                },
                
                {
                    title: "GST Report",
                    url: "/reports/gst-report",
                    cName: "nav-links",
                    icon: "GstReport",
                }
            ]
        },
    ];

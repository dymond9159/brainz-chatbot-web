import useSWR from "swr";
import { Navbar, Footer } from "@/components/widgets";
import { ChildrenProps } from "@/types";

export const MainLayout = (props: ChildrenProps) => {
    //   const { data, error } = useSWR('/api/navigation', fetcher)

    //   if (error) return <div>Failed to load</div>
    //   if (!data) return <div>Loading...</div>

    return (
        <>
            <Navbar />
            {props.children}
            <Footer />
        </>
    );
};

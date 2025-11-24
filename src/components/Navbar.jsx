'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'
import {useAuth} from '../hooks/useAuth';
import { useRouter } from "next/navigation";

// import Image from "next/image";

function Navbar() {


    const pathname = usePathname();
    const router = useRouter();
    const {user, logoutUser} = useAuth();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Articles", href: "/articles" },
        { name: "Bookmarks", href: "/bookmarks" },
        { name: "Contact", href: "/contact" },
    ];


    async function handleUserLogout() {
        await logoutUser();
        router.push('/auth/login');
    }
 
    return (

        <div className="bg-base-100 shadow-sm">
            <div className="navbar w-10/12 mx-auto">

                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                href={link.href}
                                className={`hover:text-gray-500 ${
                                    pathname === link.href ? "text-black font-bold" : ""
                                }`}
                                >
                                {link.name}
                                </Link>
                            </li>
                        ))}

                    </ul>
                    </div>
                    <Link href="/" className="btn btn-ghost text-xl">NextBlog</Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                            href={link.href}
                            className={`hover:text-gray-500 ${
                                pathname === link.href ? "text-black font-bold" : ""
                            }`}
                            >
                            {link.name}
                            </Link>
                        </li>
                    ))}

                    </ul>
                </div>

                <div className="navbar-end">

                    {
                        user ? (
                             <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                     {/* <Image className="w-full h-auto" src={user?.photoURL || "/images/dp.jpg"} alt={user?.displayName || 'default_dp'} width={50} height={50}/> */}
                                     <img className="w-full h-auto" src={user?.photoURL || "/images/dp.jpg"} alt={user?.displayName || 'default_dp'}/>
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-center">
                                    <li className="text-base font-bold p-1">@ {user.displayName}</li>
                                    <li><Link href="/blog">Publish Article</Link></li>
                                    <li><Link href={`/profile/${user.uid}`}>My Articles</Link></li>
                                    <li onClick={handleUserLogout}><a className="bg-error text-white">Logout</a></li>
                                </ul>
                            </div>

                        ) : (
                            <div className="flex items-center gap-3">
                                <div>
                                    <Link href="/auth/login" className="btn btn-outline">SignIn</Link>
                                </div>

                                <div>
                                    <Link href="/auth/register" className="btn">SignUp</Link>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default Navbar;




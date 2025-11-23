// icons
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";



function Footer() {
  return (
     <div>
       <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">

            <nav className="grid grid-flow-row sm:grid-flow-col gap-4">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>

            <nav>
                <div className="grid grid-flow-col gap-4">
                <a href="#"><FaXTwitter className="text-3xl"></FaXTwitter></a>
                <a href="#"><FaYoutube className="text-3xl"></FaYoutube></a>
                <a href="#"><FaFacebookF className="text-3xl"></FaFacebookF></a>
                </div>
            </nav>

            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by NextBlog</p>
            </aside>
        </footer>
     </div>
  );
}

export default Footer;
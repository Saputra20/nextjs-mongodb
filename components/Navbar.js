import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="navbar">
        <Link href="/">
            <a className="navbar-brand">Apps</a>
        </Link>
        <Link href="/new">
            <a className="create">Create</a>
        </Link>
        </nav>
    )
}

export default Navbar;
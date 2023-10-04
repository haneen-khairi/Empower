
import React from "react";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuItem, NavbarMenuToggle, NavbarMenu} from "@nextui-org/react";
import Logo from "@/Components/UI/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Header() {
  const route = useRouter()
  // const {}
  const menuItems = [
    "Home",
    "Contact Us",
    // "Activity",
    // "Analytics",
    // "System",
    // "Deployments",
    // "My Settings",
    // "Team Settings",
    // "Help & Feedback",
    // "Log Out",
  ];

  return (
    <Navbar className="navbar"  isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="navbar__menu hidden sm:flex gap-4" justify="center">
        <Link href={'/'} className="mr-[56px]">
          <Logo />
        </Link>
        <NavbarItem isActive={route.pathname === '/' ? true : false} className="navbar__menu--link">
          <Link className="" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={route.pathname === '/contact-us' ? true : false} className="navbar__menu--link">
          <Link className="" href="/contact-us">
          Contact Us
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        
        <NavbarItem>
          <Button as={Link} className="navbar__login" href="/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

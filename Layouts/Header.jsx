
import React, { useEffect, useState } from "react";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuItem, NavbarMenuToggle, NavbarMenu, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Logo from "@/Components/UI/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteImage from "@/Components/UI/SiteImage";
export default function Header() {
  const route = useRouter()
  const [token, setToken] = useState()
  // const {}
  function getToken(){
    if(typeof window !== undefined){
      setToken(localStorage.getItem('token'))
    }
  }
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
  useEffect(()=> {
    if(!route.isReady){
      return
    }
    getToken()

  }, [route, token])
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
      
      {token ? <>
        <NavbarContent className="navbar__menu hidden sm:flex gap-4" justify="center">
        <Link href={'/'} className="mr-[56px]">
          <Logo />
        </Link>
        <NavbarItem isActive={route.pathname === '/' ? true : false} className="navbar__menu--link">
          <Link className="" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={route.pathname === '/tests' ? true : false} className="navbar__menu--link">
          <Link className="" href="/tests">
          Tests
          </Link>
        </NavbarItem>
        <NavbarItem isActive={route.pathname === '/plan' ? true : false} className="navbar__menu--link">
          <Link className="" href="/plan">
          Plan
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="dropdown" justify="end">
        
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                

                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent min-h"
                startContent={
                  <SiteImage src={'assets/images/Profile_photo.svg'} />
                }
                endContent={
                  <SiteImage src={'assets/images/arrow_drop_down.svg'} />
                }
                radius="sm"
                variant="light"
              >
                Adeeb Shaban
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem 
            showDivider
              key="Account Information"
              startContent={
                <SiteImage src={'assets/images/setting.svg'}/>
              }
            >
              <Link href="/account-information"
>
                Account Information
              </Link>
            </DropdownItem>
            <DropdownItem
              key="Logout"
              startContent={
                <SiteImage  src={'assets/images/logout.svg'}/>

              }
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      </>:<>
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
      </>
      }

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

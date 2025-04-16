'use client';

import React from 'react';
// import * as Tabs from '@radix-ui/react-tabs';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

function SubNav() {
  return (
    <div className="container mx-auto md:flex items-center justify-between py-2 px-4 lg:px-25 hidden">

      {/* Desktop Navigation */}
      <NavigationMenu className="flex gap-4 w-full justify-center">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Pria</NavigationMenuTrigger>
            <NavigationMenuContent className="w-full">
              <TabGroup className="flex w-full">
                <TabList className="min-w-[200px] p-6 text-md border-r border-gray-200 space-y-3">
                  {['Baju', 'Celana', 'Sepatu', 'Aksesoris'].map((category) => (
                    <Tab key={category} className={({ selected }) => `
                      w-full px-4 py-2.5 text-left text-sm font-medium rounded-lg
                      transition-all duration-200 outline-none cursor-pointer
                      ${selected ? 'bg-gray-100 text-black shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}
                    `}>
                      {category}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels className="flex-1 p-6">
                  <TabPanel className="grid w-96 grid-cols-5 gap-4">
                    {['Kemeja', 'T-shirt', 'Jas Hujan', 'Kaos Polo', 'Sweater', 'Jaket'].map((item) => (
                      <a key={item} href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">{item}</a>
                    ))}
                  </TabPanel>
                  <TabPanel className="grid w-96 grid-cols-5 gap-4">
                    {['Jeans', 'Chino', 'Cargo', 'Training', 'Pendek', 'Formal'].map((item) => (
                      <a key={item} href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">{item}</a>
                    ))}
                  </TabPanel>
                  <TabPanel className="grid w-96 grid-cols-5 gap-4">
                    {['Adidas', 'Nike', 'Converse', 'Vans', 'Puma'].map((item) => (
                      <a key={item} href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">{item}</a>
                    ))}
                  </TabPanel>
                  <TabPanel className="grid w-96 grid-cols-5 gap-4">
                    {['Cincin', 'Kalung', 'Gelang', 'Jam Tangan', 'Kacamata'].map((item) => (
                      <a key={item} href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">{item}</a>
                    ))}
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </NavigationMenuContent>
            
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Wanita</NavigationMenuTrigger>
            <NavigationMenuContent className="w-full">
              <TabGroup className="flex w-full">
                <TabList className="min-w-[200px] p-6 text-md border-r border-gray-200 space-y-3">
                  {['Baju', 'Celana', 'Sepatu', 'Aksesoris'].map((category) => (
                    <Tab key={category} className={({ selected }) => `
                      w-full px-4 py-2.5 text-left text-sm font-medium rounded-lg
                      transition-all duration-200 outline-none cursor-pointer
                      ${selected ? 'bg-gray-100 text-black shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}
                    `}>
                      {category}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels className="flex-1 p-6">
                  <TabPanel className="grid w-96 grid-cols-5 gap-4">
                    {['Kemeja', 'T-shirt', 'Jas Hujan', 'Kaos Polo', 'Sweater', 'Jaket'].map((item) => (
                      <a key={item} href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">{item}</a>
                    ))}
                  </TabPanel>
                  <TabPanel className="grid w-96 grid-cols-5 gap-4">
                    {['Jeans', 'Chino', 'Cargo', 'Training', 'Pendek', 'Formal'].map((item) => (
                      <a key={item} href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">{item}</a>
                    ))}
                  </TabPanel>
                  <TabPanel className="grid w-96 grid-cols-5 gap-4">
                    {['Adidas', 'Nike', 'Converse', 'Vans', 'Puma'].map((item) => (
                      <a key={item} href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">{item}</a>
                    ))}
                  </TabPanel>
                  <TabPanel className="grid w-96 grid-cols-5 gap-4">
                    {['Cincin', 'Kalung', 'Gelang', 'Jam Tangan', 'Kacamata'].map((item) => (
                      <a key={item} href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">{item}</a>
                    ))}
                  </TabPanel>
                </TabPanels>
              </TabGroup>
              
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Unisex</NavigationMenuTrigger>
            <NavigationMenuContent className="w-full">
              <TabGroup className="flex w-full">
                <TabList className="min-w-[200px] p-6 text-md border-r border-gray-200 space-y-3">
                  {['Laki-laki', 'Perempuan'].map((category) => (
                    <Tab key={category} className={({ selected }) => `
                      w-full px-4 py-2.5 text-left text-sm font-medium rounded-lg
                      transition-all duration-200 outline-none cursor-pointer
                      ${selected ? 'bg-gray-100 text-black shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}
                    `}>
                      {category}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels className="flex-1 p-6">
                  <TabPanel className="grid w-96 grid-cols-5 gap-4">
                    {['Kemeja', 'T-shirt', 'Jas Hujan', 'Kaos Polo', 'Sweater', 'Jaket'].map((item) => (
                      <a key={item} href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">{item}</a>
                    ))}
                  </TabPanel>
                  <TabPanel className="grid w-96 grid-cols-5 gap-4">
                    {['Jeans', 'Chino', 'Cargo', 'Training', 'Pendek', 'Formal'].map((item) => (
                      <a key={item} href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">{item}</a>
                    ))}
                  </TabPanel>
                  <TabPanel className="grid w-96 grid-cols-5 gap-4">
                    {['Adidas', 'Nike', 'Converse', 'Vans', 'Puma'].map((item) => (
                      <a key={item} href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">{item}</a>
                    ))}
                  </TabPanel>
                  <TabPanel className="grid w-96 grid-cols-5 gap-4">
                    {['Cincin', 'Kalung', 'Gelang', 'Jam Tangan', 'Kacamata'].map((item) => (
                      <a key={item} href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">{item}</a>
                    ))}
                  </TabPanel>
                </TabPanels>
              </TabGroup>
              
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default SubNav;

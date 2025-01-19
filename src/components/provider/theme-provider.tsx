'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SidebarProvider } from '@/hooks/use-sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProviderProps } from 'next-themes/dist/types';

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      {...props}
      storageKey='brainz-theme'
      defaultTheme='dark'
      enableSystem={true}
      attribute='data-theme'
    >
      <SidebarProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </SidebarProvider>
    </NextThemesProvider>
  );
};

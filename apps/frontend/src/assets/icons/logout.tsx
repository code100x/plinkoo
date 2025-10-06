import { cn } from '@/lib/utils';
import React from 'react';

const LogoutIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 64 64"
      className={cn(`svg-icon size-4`, className)}
    >
      <title></title>
      <path d="M23.176 7.04h23.172v14.507h-8v-6.508H23.176v33.922h15.172v-6.508h8v14.508H23.176V64L0 56.96V7.04L23.176 0zM64 32l-15.492 8.934V36h-16.16v-8h16.16v-4.934z"></path>
    </svg>
  );
};

export default LogoutIcon;

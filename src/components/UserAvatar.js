"use client";
import { useMemo } from 'react';
import styles from './UserAvatar.module.css';

const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getRandomBlueShade = () => {
  // Array of vibrant baby blue shades
  const blueShades = [
    '#64B5F6', // Blue 300
    '#42A5F5', // Blue 400
    '#2196F3', // Blue 500
    '#90CAF9', // Blue 200
    '#4FC3F7', // Light Blue 300
    '#29B6F6', // Light Blue 400
    '#03A9F4', // Light Blue 500
    '#81D4FA', // Light Blue 200
  ];
  return blueShades[Math.floor(Math.random() * blueShades.length)];
};

export default function UserAvatar({ name, size = 40 }) {
  const initials = useMemo(() => getInitials(name), [name]);
  const backgroundColor = useMemo(() => getRandomBlueShade(), []);

  return (
    <div 
      className={styles.avatar}
      style={{ 
        backgroundColor,
        width: size,
        height: size,
        fontSize: `${size * 0.4}px`
      }}
    >
      {initials}
    </div>
  );
} 
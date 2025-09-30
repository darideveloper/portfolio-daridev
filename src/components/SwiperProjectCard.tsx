"use client";

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import { AvatarGroup, Flex, Heading, RevealFx, SmartImage, SmartLink, Text, Button } from "@/once-ui/components";
import { useTranslations } from 'next-intl';
import styles from './SwiperProjectCard.module.scss';

interface SwiperProjectCardProps {
    href: string;
    images: string[];
    title: string;
    content: string;
    description: string;
    avatars: { src: string }[];
    link: string;
    // New props for Swiper
    autoPlay?: boolean;
    autoPlayDelay?: number;
    pauseOnHover?: boolean;
    showNavigation?: boolean;
    showPagination?: boolean;
}

export const SwiperProjectCard: React.FC<SwiperProjectCardProps> = ({
    href,
    images = [],
    title,
    content,
    description,
    avatars,
    link,
    autoPlay = true,
    autoPlayDelay = 4000,
    pauseOnHover = true,
    showNavigation = false,
    showPagination = true,
}) => {
    const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [currentSlide, setCurrentSlide] = useState(0);
    const t = useTranslations();

    // Preload images for better performance
    useEffect(() => {
        if (images.length > 1) {
            const preloadImage = (src: string) => {
                const img = new Image();
                img.src = src;
            };
            images.forEach(preloadImage);
        }
    }, [images]);

    // Auto-play control handlers
    const handlePlay = () => {
        try {
            swiperRef?.autoplay?.start();
            setIsPlaying(true);
        } catch (error) {
            console.error('Error starting autoplay:', error);
        }
    };

    const handlePause = () => {
        try {
            swiperRef?.autoplay?.stop();
            setIsPlaying(false);
        } catch (error) {
            console.error('Error stopping autoplay:', error);
        }
    };

    // Image click handler for project link
    const handleImageClick = () => {
        try {
            if (href) {
                window.open(href, '_blank', 'noopener,noreferrer');
            }
        } catch (error) {
            console.error('Error opening project link:', error);
        }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleImageClick();
        }
    };

    // Handle slide change
    const handleSlideChange = (swiper: SwiperType) => {
        setCurrentSlide(swiper.realIndex);
    };

    // Get responsive configuration
    const getResponsiveConfig = (imagesLength: number) => ({
        modules: [Autoplay, Pagination, Navigation, EffectFade],
        spaceBetween: 0,
        centeredSlides: true,
        loop: imagesLength > 1,
        autoplay: autoPlay ? {
            delay: autoPlayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: pauseOnHover,
        } : false,
        pagination: imagesLength > 1 && showPagination ? {
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: function (index: number, className: string) {
                return `<span class="${className} ${styles.customBullet}"></span>`;
            },
        } : false,
        navigation: showNavigation && imagesLength > 1 ? {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        } : false,
        speed: 800,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        onSlideChange: handleSlideChange,
        breakpoints: {
            320: {
                autoplay: autoPlay ? { delay: 3000 } : false
            },
            768: {
                autoplay: autoPlay ? { delay: 4000 } : false
            },
            1024: {
                autoplay: autoPlay ? { delay: 5000 } : false
            }
        }
    });

    // Fallback for empty images array
    if (!images || images.length === 0) {
        return (
            <Flex fillWidth gap="m" direction="column">
                <Text variant="body-default-s" onBackground="neutral-weak">
                    No images available for this project.
                </Text>
                {/* Rest of the card content */}
                <Flex
                    mobileDirection="column"
                    fillWidth paddingX="s" paddingTop="12" paddingBottom="24" gap="l">
                    {title && (
                        <Flex flex={5}>
                            <Heading
                                as="h2"
                                variant="heading-strong-xl">
                                {title}
                            </Heading>
                        </Flex>
                    )}
                    {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
                        <Flex
                            flex={7} direction="column"
                            gap="16">
                            {avatars?.length > 0 && (
                                <AvatarGroup
                                    avatars={avatars}
                                    size="m"
                                    reverseOrder/>
                            )}
                            {description?.trim() && (
                                <Text
                                    variant="body-default-s"
                                    onBackground="neutral-weak">
                                    {description}
                                </Text>
                            )}
                            <Flex gap="24" wrap>
                                {content?.trim() && (
                                    <SmartLink
                                        suffixIcon="arrowRight"
                                        style={{margin: '0', width: 'fit-content'}}
                                        href={href}>
                                            <Text
                                                variant="body-default-s">
                                            {t("projectCard.label")}
                                            </Text>
                                    </SmartLink>
                                )}
                                {link && (
                                    <SmartLink
                                        suffixIcon="arrowUpRightFromSquare"
                                        style={{ margin: "0", width: "fit-content" }}
                                        href={link}>
                                        <Text variant="body-default-s">{t("projectCard.link")}</Text>
                                    </SmartLink>
                                )}
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        );
    }

    const swiperConfig = getResponsiveConfig(images.length);

    return (
        <Flex fillWidth gap="m" direction="column">
            {/* Swiper Container */}
            <div className={styles.swiperContainer}>
                <Swiper
                    onSwiper={setSwiperRef}
                    {...swiperConfig}
                    aria-label={`${title} image gallery`}
                    role="region"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <RevealFx
                                style={{width: '100%'}}
                                delay={0.4}
                                trigger={true}
                                speed="fast">
                                <SmartImage
                                    tabIndex={0}
                                    radius="l"
                                    alt={`${title} - Image ${index + 1} of ${images.length}`}
                                    aspectRatio="16 / 9"
                                    src={image}
                                    onClick={handleImageClick}
                                    onKeyDown={handleKeyDown}
                                    style={{
                                        border: '1px solid var(--neutral-alpha-weak)',
                                        cursor: 'pointer',
                                    }}
                                    aria-label={`View ${title} project details`}
                                />
                            </RevealFx>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation */}
                {showNavigation && images.length > 1 && (
                    <div className={styles.swiperNavigation}>
                        <button className="swiper-button-prev" aria-label="Previous image" />
                        <button className="swiper-button-next" aria-label="Next image" />
                    </div>
                )}

                {/* Auto-play Controls */}
                {autoPlay && images.length > 1 && (
                    <div className={styles.autoPlayControls}>
                        <Button
                            variant="tertiary"
                            size="s"
                            onClick={isPlaying ? handlePause : handlePlay}
                            prefixIcon={isPlaying ? "pause" : "play"}
                        >
                            {isPlaying ? t("projectCard.pause") : t("projectCard.play")}
                        </Button>
                    </div>
                )}
            </div>

            {/* Rest of the card content */}
            <Flex
                mobileDirection="column"
                fillWidth paddingX="s" paddingTop="12" paddingBottom="24" gap="l">
                {title && (
                    <Flex flex={5}>
                        <Heading
                            as="h2"
                            variant="heading-strong-xl">
                            {title}
                        </Heading>
                    </Flex>
                )}
                {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
                    <Flex
                        flex={7} direction="column"
                        gap="16">
                        {avatars?.length > 0 && (
                            <AvatarGroup
                                avatars={avatars}
                                size="m"
                                reverseOrder/>
                        )}
                        {description?.trim() && (
                            <Text
                                variant="body-default-s"
                                onBackground="neutral-weak">
                                {description}
                            </Text>
                        )}
                        <Flex gap="24" wrap>
                            {content?.trim() && (
                                <SmartLink
                                    suffixIcon="arrowRight"
                                    style={{margin: '0', width: 'fit-content'}}
                                    href={href}>
                                        <Text
                                            variant="body-default-s">
                                        {t("projectCard.label")}
                                        </Text>
                                </SmartLink>
                            )}
                            {link && (
                                <SmartLink
                                    suffixIcon="arrowUpRightFromSquare"
                                    style={{ margin: "0", width: "fit-content" }}
                                    href={link}>
                                    <Text variant="body-default-s">{t("projectCard.link")}</Text>
                                </SmartLink>
                            )}
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

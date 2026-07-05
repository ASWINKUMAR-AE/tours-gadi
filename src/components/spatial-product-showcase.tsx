'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    Battery,
    Sliders,
    ChevronRight,
    Zap,
    Bluetooth,
    Wifi,
    Music,
    LucideIcon,
    Globe,
    Calendar,
} from 'lucide-react';

/* ================= TYPES ================= */

export type ProductId = 'rider' | 'driver' | 'vendor';

export interface FeatureMetric {
    label: string;
    value: number;
    icon: LucideIcon;
}

export interface ProductData {
    id: ProductId;
    label: string;
    title: string;
    description: string;
    image: string;
    icon: LucideIcon; // ✅ ICON FOR CONTENT
    stats: {
        connectionStatus: string;
        batteryLevel: number;
    };
    features: FeatureMetric[];
}

/* ================= DATA ================= */

const PRODUCT_DATA: Record<ProductId, ProductData> = {
    rider: {
        id: 'rider',
        label: 'Rider',
        title: 'Fair Rides, Full Transparency',
        description:
            'Book rides and customized packages with confidence. Riders enjoy upfront pricing, verified drivers, live tracking, and complete transparency on the fare before confirming the ride.',
        image: '/images/mobile_mockup_rider.png',
        icon: Wifi, // ✅ Rider icon
        stats: {
            connectionStatus: 'Rider Service Active',
            batteryLevel: 100,
        },
        features: [
            { label: 'Custom Tour Packages', value: 100, icon: Zap },
            { label: 'Upfront Fare Details', value: 100, icon: Wifi },
        ],
    },

    driver: {
        id: 'driver',
        label: 'Driver',
        title: 'Simple Earnings Model',
        description:
            'Drivers pay only a commission per ride. No platform fees. No subscriptions. No hidden deductions.',
        image: '/images/mobile_mockup_driver.png',
        icon: Battery, // ✅ Driver icon
        stats: {
            connectionStatus: 'Driver Online',
            batteryLevel: 100,
        },
        features: [
            { label: 'Commission Fee', value: 10, icon: Bluetooth },
            { label: 'Other Fees', value: 0, icon: Music },
        ],
    },

    vendor: {
        id: 'vendor',
        label: 'Tour Agent (Vendor)',
        title: 'Create & Publish Packages',
        description:
            'Tour agents and vendors can design, list, and customize tour packages. Offer travelers unforgettable experiences with full booking controls and dashboard analytics.',
        image: '/images/mobile_mockup_driver.png', // Fallback to existing mockup
        icon: Sliders,
        stats: {
            connectionStatus: 'Agent Console Active',
            batteryLevel: 100,
        },
        features: [
            { label: 'Package Management', value: 100, icon: Sliders },
            { label: 'Lead Management', value: 95, icon: Zap },
        ],
    },
};

/* ================= ANIMATION ================= */

const imageVariants = (activeTab: ProductId): Variants => ({
    initial: {
        opacity: 0,
        x: activeTab === 'rider' ? -60 : activeTab === 'vendor' ? 60 : 0,
        scale: 1.25,
        rotate: activeTab === 'rider' ? -10 : activeTab === 'vendor' ? 10 : 0,
        filter: 'blur(16px)',
    },
    animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        rotate: 0,
        filter: 'blur(0px)',
        transition: {
            type: 'spring',
            stiffness: 140,
            damping: 24,
        },
    },
    exit: {
        opacity: 0,
        x: activeTab === 'rider' ? 60 : activeTab === 'vendor' ? -60 : 0,
        scale: 0.85,
        filter: 'blur(18px)',
        transition: { duration: 0.35 },
    },
});

/* ================= COMPONENT ================= */

export default function RiderDriverShowcase() {
    const [active, setActive] = useState<ProductId>('rider');
    const [isMobile, setIsMobile] = useState(false);

    const data = PRODUCT_DATA[active];
    const accent = active === 'rider' ? '#2563EB' : active === 'driver' ? '#10B981' : '#F59E0B';

    const imageOrder = isMobile ? 1 : (active === 'rider' || active === 'vendor') ? 1 : 2;
    const contentOrder = isMobile ? 2 : (active === 'rider' || active === 'vendor') ? 2 : 1;

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 900px)');
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    return (
        <div
            style={{
                minHeight: '80vh',
                background: '#000',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                margin: 20,
                borderRadius: 50,
                position: 'relative',
                padding: isMobile ? '50px 20px 130px' : '0',
            }}
        >
            {/* BACKGROUND */}
            <motion.div
                style={{ position: 'absolute', inset: 0 }}
                animate={{
                    background: `radial-gradient(
            circle at ${active === 'rider' ? '30%' : active === 'driver' ? '50%' : '70%'} 40%,
            ${accent}40 0%,
            ${accent}25 25%,
            ${accent}15 45%,
            transparent 70%
          )`,
                }}
                transition={{ duration: 1.4 }}
            />

            {/* MAIN GRID */}
            <div
                style={{
                    maxWidth: 1300,
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? 70 : 140,
                    alignItems: 'center',
                    zIndex: 2,
                }}
            >
                {/* IMAGE */}
                <div style={{ order: imageOrder, display: 'flex', justifyContent: 'center' }}>
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            width: isMobile ? 300 : 520,
                            height: isMobile ? 300 : 520,
                            borderRadius: '50%',
                            position: 'relative',
                        }}
                    >
                        <motion.div
                            animate={{ opacity: [0.3, 0.55, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            style={{
                                position: 'absolute',
                                inset: '-18%',
                                borderRadius: '50%',
                                background: accent,
                                filter: 'blur(120px)',
                                zIndex: -1,
                            }}
                        />

                        <AnimatePresence mode="wait">
                            <motion.img
                                key={data.id}
                                src={data.image}
                                variants={imageVariants(active)}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    padding: isMobile ? 24 : 48,
                                }}
                                draggable={false}
                            />
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* CONTENT */}
                <div style={{ order: contentOrder, maxWidth: 440 }}>
                    {/* ICON HEADER */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            marginBottom: 6,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 11,
                                letterSpacing: 4,
                                color: '#888',
                                textTransform: 'uppercase',
                            }}
                        >
                            {data.label}
                        </span>
                    </motion.div>

                    <h1 style={{ fontSize: isMobile ? 36 : 52, margin: '14px 0' }}>
                        {data.title}
                    </h1>

                    <p style={{ color: '#aaa', lineHeight: 1.65 }}>
                        {data.description}
                    </p>

                    {/* FEATURES */}
                    <div
                        style={{
                            marginTop: 30,
                            padding: 24,
                            borderRadius: 22,
                            background: 'rgba(20,20,20,0.8)',
                            border: '1px solid rgba(255,255,255,0.15)',
                        }}
                    >
                        {data.features.map((f, i) => (
                            <div key={f.label} style={{ marginBottom: 18 }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: 8,
                                    }}
                                >
                                    <span style={{ display: 'flex', gap: 6 }}>
                                        {f.label}
                                    </span>
                                    <span>{f.value}%</span>
                                </div>

                                <div
                                    style={{
                                        height: 6,
                                        background: '#222',
                                        borderRadius: 999,
                                    }}
                                >
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${f.value}%` }}
                                        transition={{ duration: 0.9, delay: i * 0.12 }}
                                        style={{
                                            height: '100%',
                                            background: accent,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}

                        <button
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#ccc',
                                fontSize: 11,
                                letterSpacing: 2,
                                display: 'flex',
                                gap: 6,
                                cursor: 'pointer',
                            }}
                        >
                            <Sliders size={14} />
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* SWITCHER */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 24,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(20,20,20,0.9)',
                    borderRadius: 999,
                    padding: 6,
                    display: 'flex',
                    border: '1px solid rgba(255,255,255,0.15)',
                    zIndex: 10,
                }}
            >
                {(['rider', 'driver', 'vendor'] as ProductId[]).map(id => (
                    <button
                        key={id}
                        onClick={() => setActive(id)}
                        style={{
                            padding: '10px 26px',
                            borderRadius: 999,
                            border: 'none',
                            background: active === id ? '#fff' : 'transparent',
                            color: active === id ? '#000' : '#888',
                            cursor: 'pointer',
                        }}
                    >
                        {PRODUCT_DATA[id].label}
                    </button>
                ))}
            </div>
        </div>
    );
}

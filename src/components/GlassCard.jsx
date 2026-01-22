import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', style = {}, ...props }) => {
    return (
        <motion.div
            className={`glass-card ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(var(--glass-blur))',
                WebkitBackdropFilter: 'blur(var(--glass-blur))', // Safari support
                border: '1px solid var(--glass-border)',
                borderRadius: '24px',
                padding: '20px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                ...style
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;

// @ts-ignore
const Badge = ({ className = '', children }) => {
    return (
        <span className={`inline-block bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full ${className}`}>
            {children}
        </span>
    );
};

export default Badge;

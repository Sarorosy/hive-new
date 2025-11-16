import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, MessageCircle, Facebook, Link as LinkIcon, Send } from "lucide-react";
import toast from "react-hot-toast";

const ShareModal = ({ isOpen, onClose, productTitle, productUrl, productImage }) => {
  if (!isOpen) return null;

  const shareText = `Check out ${productTitle} at The Hive!`;
  const encodedUrl = encodeURIComponent(productUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
    window.open(url, "_blank");
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    window.open(url, "_blank");
  };

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(productUrl);
      toast.success("Link copied to clipboard!");
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = productUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Product
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Share Options */}
            <div className="px-4 py-4">
              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp */}
                <button
                  onClick={shareToWhatsApp}
                  className="flex flex-col items-center justify-center px-3 py-3 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                </button>

                {/* Facebook */}
                <button
                  onClick={shareToFacebook}
                  className="flex flex-col items-center justify-center px-3 py-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Facebook</span>
                </button>

                {/* Telegram */}
                <button
                  onClick={shareToTelegram}
                  className="flex flex-col items-center justify-center px-3 py-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Telegram</span>
                </button>

                {/* Copy Link */}
                <button
                  onClick={copyLink}
                  className="flex flex-col items-center justify-center px-3 py-3 rounded-lg border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <LinkIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Copy Link</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;


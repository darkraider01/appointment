import React, { useState, useEffect } from 'react';
import { Calendar } from './components/ui/calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Sparkles, ArrowRight, ChevronLeft } from 'lucide-react';
import { format } from 'date-fns';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

const services = [
  {
    id: 1,
    name: 'Executive Coaching',
    duration: '1 hour',
    price: '$250',
    description: 'One-on-one coaching to unlock your leadership potential',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    name: 'Strategic Planning',
    duration: '2 hours',
    price: '$400',
    description: 'Comprehensive business strategy and growth planning',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    name: 'Innovation Workshop',
    duration: '3 hours',
    price: '$600',
    description: 'Transform your business with cutting-edge innovation strategies',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { duration: 0.4 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleContinue = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-12">
      <motion.div
        className="glow"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto relative z-10"
        >
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
              Transform Your Future
            </h1>
            <p className="text-xl text-slate-300">Book your path to success with our expert consultants</p>
          </motion.div>

          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="progress-bar flex items-center justify-center mb-12 relative">
              {[1, 2, 3].map((i) => (
                <React.Fragment key={i}>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: step >= i ? 1 : 0.8,
                      backgroundColor: step >= i ? 'rgb(59, 130, 246)' : 'rgba(255, 255, 255, 0.1)'
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center relative z-10"
                  >
                    <span className="text-white font-semibold">{i}</span>
                    {step === i && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-blue-400"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>
                  {i < 3 && <div className="w-24 h-px bg-slate-700 relative z-0" />}
                </React.Fragment>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-3xl font-bold mb-8 flex items-center">
                    <Sparkles className="w-6 h-6 mr-3 text-blue-400" />
                    Select Your Experience
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                      <motion.div
                        key={service.id}
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`service-card rounded-xl overflow-hidden cursor-pointer transition-all ${
                          selectedService === service.id 
                            ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20' 
                            : 'hover:shadow-lg hover:shadow-blue-500/10'
                        }`}
                        onClick={() => setSelectedService(service.id)}
                      >
                        <div className="relative">
                          <img 
                            src={service.image} 
                            alt={service.name} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="p-6 bg-white/5">
                          <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                          <p className="text-slate-300 text-sm mb-4">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-slate-300">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{service.duration}</span>
                            </div>
                            <span className="text-lg font-bold text-blue-400">{service.price}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-3xl font-bold mb-8 flex items-center">
                    <CalendarIcon className="w-6 h-6 mr-3 text-blue-400" />
                    Choose Your Perfect Time
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div 
                      variants={itemVariants}
                      className="glass-card p-6 rounded-xl"
                    >
                      <div className="flex items-center mb-6">
                        <CalendarIcon className="w-5 h-5 mr-2 text-blue-400" />
                        <span className="font-semibold">Select Date</span>
                      </div>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="bg-white/5 rounded-lg"
                      />
                    </motion.div>
                    <motion.div 
                      variants={itemVariants}
                      className="glass-card p-6 rounded-xl"
                    >
                      <div className="flex items-center mb-6">
                        <Clock className="w-5 h-5 mr-2 text-blue-400" />
                        <span className="font-semibold">Select Time</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((time) => (
                          <motion.button
                            key={time}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`time-slot p-4 rounded-lg text-center transition-all ${
                              selectedTime === time
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-white/5 hover:bg-white/10'
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="max-w-2xl mx-auto"
                >
                  <h2 className="text-3xl font-bold mb-8 flex items-center">
                    <Sparkles className="w-6 h-6 mr-3 text-blue-400" />
                    Confirm Your Journey
                  </h2>
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="glass-card p-6 rounded-xl"
                    >
                      <div className="flex items-center mb-4">
                        <Users className="w-5 h-5 mr-3 text-blue-400" />
                        <span className="font-semibold text-lg">Selected Experience</span>
                      </div>
                      <div className="flex items-center">
                        <img 
                          src={services.find(s => s.id === selectedService)?.image}
                          alt="Service"
                          className="w-16 h-16 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-xl">
                            {services.find(s => s.id === selectedService)?.name}
                          </h3>
                          <p className="text-slate-300">
                            {services.find(s => s.id === selectedService)?.duration} - {services.find(s => s.id === selectedService)?.price}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      variants={itemVariants}
                      className="glass-card p-6 rounded-xl"
                    >
                      <div className="flex items-center mb-4">
                        <CalendarIcon className="w-5 h-5 mr-3 text-blue-400" />
                        <span className="font-semibold text-lg">Date & Time</span>
                      </div>
                      <p className="text-xl">
                        {date && format(date, 'EEEE, MMMM d, yyyy')} at{' '}
                        <span className="text-blue-400 font-semibold">{selectedTime}</span>
                      </p>
                    </motion.div>

                    <motion.div 
                      variants={itemVariants}
                      className="glass-card p-6 rounded-xl"
                    >
                      <div className="flex items-center mb-4">
                        <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                        <span className="font-semibold text-lg">Location</span>
                      </div>
                      <p className="text-slate-300">
                        Virtual Meeting (link will be sent via email)
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-12">
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all flex items-center"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Back
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                disabled={
                  (step === 1 && !selectedService) ||
                  (step === 2 && (!date || !selectedTime))
                }
                className={`px-8 py-3 rounded-lg ml-auto flex items-center ${
                  ((step === 1 && !selectedService) ||
                    (step === 2 && (!date || !selectedTime)))
                    ? 'bg-slate-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20'
                } transition-all`}
              >
                {step === 3 ? (
                  <>
                    Confirm Booking
                    <Sparkles className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
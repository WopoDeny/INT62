import { useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from 'react-use';
import { AiFillCaretRight, AiOutlineRollback, AiFillPlusCircle, AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import "./Sidebar.css";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [sectionUrl, setSectionUrl] = useState('');
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); 
  const ref = useRef(null);
  const navigate = useNavigate();
  useClickAway(ref, () => setOpen(false));
  const toggleSidebar = () => setOpen(prev => !prev);

  const openCourseModal = () => {
    setIsCourseModalOpen(true);
  };

  const closeCourseModal = () => {
    setIsCourseModalOpen(false);
    setCourseName('');
  };

  const addCourse = () => {
    if (courseName.trim()) {
      const newCourse = {
        title: courseName,
        sections: [],
      };
      setCourses([...courses, newCourse]);
      closeCourseModal();
    }
  };

  const openSectionModal = (index) => {
    setSelectedCourseIndex(index);
    setIsSectionModalOpen(true);
  };

  const closeSectionModal = () => {
    setIsSectionModalOpen(false);
    setSectionName('');
    setSectionUrl('');
  };

  const addSection = () => {
    if (sectionName.trim() && sectionUrl.trim() && selectedCourseIndex !== null) {
      const updatedCourses = [...courses];
      updatedCourses[selectedCourseIndex].sections.push({
        title: sectionName,
        url: sectionUrl,
      });
      setCourses(updatedCourses);
      closeSectionModal();
    }
  };

  const handleSectionClick = (url) => {
    navigate(url);
    toggleSidebar();
  };

  // Фильтрация курсов по поисковому запросу
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="p-3 border-2 border-zinc-800 rounded-xl "
        aria-label="toggle sidebar"
      >
        <GiHamburgerMenu />
      </button>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm "
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs border-r-2 border-zinc-800 bg-zinc-900 bg-gradient-to-r from-pink-600 to-violet-950"
              ref={ref}
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between p-5 border-b-2 border-zinc-800">
                <span>62 кафедра</span>
                <button
                  onClick={toggleSidebar}
                  className="p-3 border-2 border-zinc-800 rounded-xl "
                  aria-label="close sidebar"
                >
                  <AiOutlineRollback />
                </button>
              </div>

              {/* Поле поиска */}
              <div className="border-b-2 border-zinc-800 relative">
                <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pr-10  bg-violet-950 text-white"
                placeholder="Поиск курсов"
                />
                <AiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-white" />
              </div>

              <ul className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-custom">
                {items.map((item, idx) => {
                  const { title, href, Icon } = item;
                  return (
                    <li key={title}>
                      <a
                        onClick={toggleSidebar}
                        href={href}
                        className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover:bg-pink-600 border-zinc-800"
                      >
                        <motion.span {...framerText(idx)}>{title}</motion.span>
                        <motion.div {...framerIcon}>
                          <Icon className="text-2xl" />
                        </motion.div>
                      </a>
                    </li>
                  );
                })}
                {filteredCourses.map((course, index) => (
                  <li key={index}>
                    <div className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover:bg-pink-600 border-zinc-800">
                      <motion.span {...framerText(index)}>{course.title}</motion.span>
                      <button
                        onClick={() => openSectionModal(index)}
                        className="p-2 hover:bg-pink-600 rounded-lg"
                        aria-label="Добавить раздел"
                      >
                        <AiFillPlusCircle className="text-xl" />
                      </button>
                    </div>
                    {course.sections.length > 0 && (
                      <ul className="pl-5">
                        {course.sections.map((section, sectionIndex) => (
                          <li key={sectionIndex}>
                            <button
                              onClick={() => handleSectionClick(section.url)}
                              className="flex items-center justify-between gap-5 p-3 transition-all border-b-2 hover:bg-pink-600 border-zinc-800 w-full"
                            >
                              <motion.span {...framerText(sectionIndex)}>{section.title}</motion.span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li>
                  <button
                    onClick={openCourseModal}
                    className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover:bg-pink-600 border-zinc-800 w-full"
                  >
                    <motion.span {...framerText(courses.length)}>Добавить курс</motion.span>
                    <motion.div {...framerIcon}>
                      <AiFillPlusCircle className="text-2xl" />
                    </motion.div>
                  </button>
                </li>
              </ul>

              {/* Кнопки навигации в нижней части */}
              <div className="p-3 border-t-2 border-zinc-800 flex justify-around fixed bottom-0 left-0 w-full max-w-xs bg-violet-950">
                <button
                  onClick={() => navigate('/')}
                  className="relative group overflow-hidden px-4 py-3 bg-primary text-white rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-2xl hover:scale-105"
                >
                  <span className="absolute inset-0 bg-accent transition-transform transform translate-x-full group-hover:translate-x-0"></span>
                  <span className="relative z-10">Главная</span>
                </button>
                <button
                  onClick={() => navigate('/registration')}
                  className="relative group overflow-hidden px-4 py-3 bg-primary text-white rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-2xl hover:scale-105"
                >
                  <span className="absolute inset-0 bg-accent transition-transform transform translate-x-full group-hover:translate-x-0"></span>
                  <span className="relative z-10">Регистрация</span>
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="relative group overflow-hidden px-4 py-3 bg-primary text-white rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-2xl hover:scale-105"
                >
                  <span className="absolute inset-0 bg-accent transition-transform transform translate-x-full group-hover:translate-x-0"></span>
                  <span className="relative z-10">Вход</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCourseModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-violet-950 p-6 rounded-lg w-80"
            >
              <h2 className="text-lg font-bold mb-4">Введите название курса</h2>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full p-2 mb-4 border-2 border-zinc-800 rounded-lg bg-pink-600 text-white"
                placeholder="Название курса"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={closeCourseModal}
                  className="p-2 border-2 border-zinc-800 rounded-lg hover:bg-pink-600"
                >
                  Отмена
                </button>
                <button
                  onClick={addCourse}
                  className="p-2 border-2 border-zinc-800 rounded-lg hover:bg-pink-600"
                >
                  Добавить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSectionModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-violet-950 p-6 rounded-lg w-80"
            >
              <h2 className="text-lg font-bold mb-4">Введите название раздела и подтвердите название раздела</h2>
              <input
                type="text"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                className="w-full p-2 mb-4 border-2 border-zinc-800 rounded-lg bg-pink-600 text-white"
                placeholder="Название раздела"
              />
              <input
                type="text"
                value={sectionUrl}
                onChange={(e) => setSectionUrl(e.target.value)}
                className="w-full p-2 mb-4 border-2 border-zinc-800 rounded-lg bg-pink-600 text-white"
                placeholder="Подтвердить название раздела"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={closeSectionModal}
                  className="p-2 border-2 border-zinc-800 rounded-lg hover:bg-pink-600"
                >
                  Отмена
                </button>
                <button
                  onClick={addSection}
                  className="p-2 border-2 border-zinc-800 rounded-lg hover:bg-pink-600"
                >
                  Добавить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const items = [
  { title: 'Все курсы', Icon: AiFillCaretRight, href: '/page' },
];

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
  transition: { duration: 0.3 },
};

const framerText = delay => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  }
};
'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { CSSProperties } from 'react';
import ImageView from '@/components/ImageView';

import Section from '@/components/Section';
import Navbar from '@/components/Navbar';

const sectionsArray = [
  {
    id: 'section0',
    background: '/images/back-0.jpg',
  },
  {
    id: 'section1',
    background: '/images/back-1.jpg',
  },
  {
    id: 'section2',
    background: '/images/back-2.jpg',
  },
  {
    id: 'section3',
    background: '/images/back-3.jpg',
  },
];

const snapToSection = (
  nextSectionId: string,
  callback: (param: string) => void
) => {
  const nextSection = document.getElementById(nextSectionId);
  if (nextSection) {
    const scrollPos = nextSection.offsetTop;
    window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    callback(nextSectionId);
  }
};

const IndexPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let closestSectionId = '';
      let closestDistance = Infinity;

      sections.forEach((section: Element) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSectionId = section.id;
        }
      });

      setCurrentSection(closestSectionId);
    };

    const handleMouseWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.sign(event.deltaY);
      const currentSectionIndex = sections.findIndex(
        (section) => section.id === currentSection
      );
      const nextSectionIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentSectionIndex + delta)
      );
      const nextSectionId = sections[nextSectionIndex].id;
      snapToSection(nextSectionId, setCurrentSection);
    };

    const sections = Array.from(document.querySelectorAll('section'));

    document.addEventListener('scroll', handleScroll);
    handleScroll();

    document.addEventListener('wheel', handleMouseWheel);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('wheel', handleMouseWheel);
    };
  }, [currentSection]);

  const outline: CSSProperties = {
    outline: '1px solid rgba(211, 211, 211, 0.2)',

    outlineOffset: '-10px',
  };

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <Head>
        <title>Scrolling Sections</title>
        {/* Add any other necessary meta tags */}
      </Head>

      <Navbar></Navbar>

      <nav className='fixed top-0 left-0 h-full shadow-lg z-50 flex flex-col justify-center pl-10'>
        <ul className='flex flex-col items-start space-y-4'>
          {sectionsArray.map((section, index) => (
            <li
              key={index}
              className={
                currentSection === section.id ? 'font-bold' : 'font-light'
              }
            >
              <button
                onClick={() => snapToSection(section.id, setCurrentSection)}
              >
                <Image
                  src={
                    currentSection === section.id
                      ? 'icons/RectIn.svg'
                      : 'icons/RectOut.svg'
                  }
                  alt='*'
                  width={45}
                  height={12}
                  priority
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {modalOpen && (
        <ImageView
          image1='/images/back-0.jpg'
          image2='/images/back-1.jpg'
          image3='/images/back-2.jpg'
          onClose={toggleModal}
        />
      )}

      {sectionsArray.map((section, index) => (
        <Section key={index} id={section.id} background={section.background}>
          <div className='h-screen w-screen flex flex-col items-end text-right  font-thin text-white mt-[10rem] mr-[3rem]'>
            <h1 className=' text-4xl mt-[3rem]'>Open World</h1>
            <p className='text-1xl max-w-[25rem] mt-[1rem]'>
              Explore the amazing world of The Hobbit with all it's journeys and
              emotions! The story, charachters, dwarves, spiders and much much
              more! Find the Gollum and steal his ring to become one of the most
              powerful creatures alive! With the power of the ring, your Sting
              will shine the way...
            </p>
            <div className='grid grid-cols-2 grid-rows-2 gap-8 mt-[4rem]'>
              <div onClick={toggleModal}>
                <Image
                  style={outline}
                  src={'/images/back-0.jpg'}
                  alt='*'
                  width={270}
                  height={140}
                  priority
                  className='cursor-pointer'
                />
                <p className='flex justify-center'>Long story</p>
              </div>
              <div>
                <Image
                  style={outline}
                  src={'/images/back-1.jpg'}
                  alt='*'
                  width={270}
                  height={140}
                  priority
                  className='cursor-pointer'
                />
                <p className='flex justify-center'>Long story</p>
              </div>
              <div>
                <Image
                  style={outline}
                  src={'/images/back-2.jpg'}
                  alt='*'
                  width={270}
                  height={140}
                  priority
                  className='cursor-pointer'
                />
                <p className='flex justify-center'>Long story</p>
              </div>
              <div>
                <Image
                  style={outline}
                  src={'/images/back-3.jpg'}
                  alt='*'
                  width={270}
                  height={140}
                  priority
                  className='cursor-pointer'
                ></Image>
                <p className='flex justify-center'>Long story</p>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* Add more sections as needed */}
    </div>
  );
};

export default IndexPage;

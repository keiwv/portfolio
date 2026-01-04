"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface UseActiveSectionOptions {
  threshold?: number;
  rootMargin?: string;
  scrollEndDelay?: number;
}

export function useActiveSection(
  sectionIds: string[],
  options: UseActiveSectionOptions = {}
) {
  const {
    threshold = 0.3,
    rootMargin = "-20% 0px -80% 0px",
    scrollEndDelay = 250,
  } = options;

  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolling, setIsScrolling] = useState(false);

  const isNavbarNavigatingRef = useRef(false);
  const targetSectionRef = useRef<string | null>(null);
  const scrollTimerRef = useRef<number | null>(null);

  const sectionObservers = sectionIds.map((id) => {
    const { ref, inView, entry } = useInView({
      threshold,
      rootMargin,
    });
    
    return { id, ref, inView, entry };
  });

  useEffect(() => {
    sectionObservers.forEach(({ id, ref }) => {
      const element = document.getElementById(id);
      if (element) {
        ref(element);
      }
    });
  }, [sectionIds]);

  useEffect(() => {
    const visibleSections = sectionObservers
      .filter(({ inView }) => inView)
      .sort((a, b) => {
        const ratioA = a.entry?.intersectionRatio || 0;
        const ratioB = b.entry?.intersectionRatio || 0;
        return ratioB - ratioA;
      });

    if (!visibleSections.length) {
      return; // No sections are visible so wek eep the current section
    }

    const mostVisible = visibleSections[0];
    
    if (isNavbarNavigatingRef.current) {
      if (mostVisible.id === targetSectionRef.current) {
        setActiveSection(mostVisible.id);
        isNavbarNavigatingRef.current = false;
        targetSectionRef.current = null;
      }
      return;
    }

    setActiveSection(mostVisible.id);
  }, [sectionObservers.map(s => s.inView).join(','), sectionObservers.map(s => s.entry?.intersectionRatio).join(',')]);

  // Handle scroll state
  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true);
      if (scrollTimerRef.current !== null) {
        clearTimeout(scrollTimerRef.current);
      }

      scrollTimerRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, scrollEndDelay);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimerRef.current !== null) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [scrollEndDelay]);

  useEffect(() => {
    if (sectionIds.length > 0 && !activeSection) {
      setActiveSection(sectionIds[0]);
    }
  }, [sectionIds]);

  const startNavbarNavigation = (targetId: string) => {
    isNavbarNavigatingRef.current = true;
    targetSectionRef.current = targetId;
  };

  return {
    activeSection,
    isScrolling,
    startNavbarNavigation,
  };
}

export default useActiveSection;

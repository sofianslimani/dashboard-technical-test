"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

interface Stat {
  title: string;
  value: number;
  sourcing: number;
  hunt: number;
}

interface Project {
  type: string;
  title: string;
  launchDate: string;
  stats: Stat[];
}

interface ProjectsSliderProps {
  projects: Project[];
}

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => (
  <Card className="bg-white text-primary rounded-2xl flex flex-col gap-0 p-4 lg:p-3 2xl:p-6 lg:gap-0 h-full justify-center">
    <CardTitle className="text-md font-semibold text-left justify-start items-start 2xl:text-xl">
      {stat.title}
    </CardTitle>
    <div className="flex items-center gap-4 2xl:gap-6">
      <span className="text-xl 2xl:text-3xl font-bold">{stat.value}</span>
      <div className="text-[11px] 2xl:text-sm font-bold">
        <p className="text-gray-400">
          <span className="text-green-500">{stat.sourcing}</span> Sourcing
        </p>
        <p className="text-gray-400">
          <span className="text-gray-700">{stat.hunt}</span> Chasse
        </p>
      </div>
    </div>
  </Card>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-blue-600 text-white p-4 xl:p-4 2xl:p-7 rounded-2xl flex flex-col gap-4 2xl:gap-8 h-full max-w-72 2xl:max-w-sm w-full flex-shrink-0">
    <div className="flex flex-col gap-2 2xl:gap-4">
      <Badge variant="secondary" className="self-start">
        {project.type}
      </Badge>
      <h3 className="text-md 2xl:text-xl font-bold">{project.title}</h3>
      <div className="flex items-center text-xs 2xl:text-base">
        <CalendarIcon className="h-4 w-4 mr-2" />
        <span>{project.launchDate}</span>
      </div>
    </div>
    <div className="flex-grow flex flex-col space-y-1 h-full">
      {project.stats.slice(0, 3).map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  </div>
);

const ProjectsSlider: React.FC<ProjectsSliderProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateProject = (direction: 1 | -1) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + direction + projects.length) % projects.length
    );
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex-shrink-0 flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          {projects.length} Projets en cours
        </CardTitle>
        <div className="flex gap-2">
          {[
            { icon: ChevronLeftIcon, onClick: () => navigateProject(-1) },
            { icon: ChevronRightIcon, onClick: () => navigateProject(1) },
          ].map(({ icon: Icon, onClick }, index) => (
            <Button
              key={index}
              variant="slate-100"
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={onClick}
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ProjectCard project={projects[currentIndex]} />
      </CardContent>
    </Card>
  );
};

export default ProjectsSlider;

"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Badge } from "@/components/ui/badge";
import ProjectsSlider from "@/components/ProjectsSlider";

const projects = [
  {
    type: "Recrutement",
    title: "POP - SDR Levallois",
    launchDate: "Lancée le 12/01/23",
    stats: [
      { title: "Nombre de candidatures", value: 537, sourcing: 51, hunt: 1 },
      { title: "Candidats évalués", value: 14, sourcing: 51, hunt: 1 },
      { title: "Dossiers présentés", value: 537, sourcing: 51, hunt: 1 },
    ],
  },
];

const WelcomeCard = () => (
  <Card className="flex-shrink-0">
    <CardHeader>
      <CardTitle className="opacity-50 font-light text-3xl">Hello !</CardTitle>
      <h2 className="text-3xl font-bold">Esther Howard</h2>
      <Badge variant="default" className="text-xs">
        esther-howard@gmail.com
      </Badge>
    </CardHeader>
  </Card>
);

const ToolCard = ({
  title,
  badge,
  description,
}: {
  title: string;
  badge: string;
  description: string;
}) => (
  <Card className="flex flex-col gap-1 lg:gap-2 xl:gap-4 xl:p-8">
    <CardHeader>
      <Badge variant="secondary">{badge}</Badge>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      <p className="text-xl xl:text-2xl font-semibold">{title}</p>
      <p className="text-sm max-w-sm">{description}</p>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Évaluer mes commerciaux</Button>
    </CardFooter>
  </Card>
);

const StudyCard = ({ index }: { index: number }) => (
  <div className="aspect-auto overflow-hidden rounded-xl h-full ">
    <Image
      src={`/images/etudes/etude-${index}.jpg`}
      alt={`etude-${index}`}
      width={152}
      height={152}
      className="w-full h-full object-cover"
    />
  </div>
);

export default function Home() {
  const toolsData = useMemo(
    () => [
      {
        title: "Scan",
        badge: "Gratuit",
        description:
          "Quelles sont les forces et faiblesses de votre exécution commerciale ?",
      },
      {
        title: "Assessment",
        badge: "5 évaluations gratuites",
        description:
          "Quel est le niveau de vos commerciaux et leurs axes de progression ?",
      },
    ],
    []
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-7 h-full pt-14 pb-14 sm:pt-0 sm:pb-0">
      <div className="flex flex-col lg:col-span-3 xl:col-span-2 gap-7 h-full">
        <WelcomeCard />
        <div className="flex-grow h-full">
          <ProjectsSlider projects={projects} />
        </div>
      </div>
      <div className="flex flex-col lg:col-span-3 xl:col-span-4 gap-7 sm:gap-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Découvrez vos outils pour gagner des points de croissance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {toolsData.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-none overflow-auto bg-transparent p-0 lg:p-0 2xl:p-0 h-full justify-end lg:gap-4 2xl:gap-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Études</CardTitle>
            <Button variant="link" className="text-sm" size="link">
              Tout voir <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 2xl:gap-8 w-full">
              {[1, 2, 3, 4].map((i) => (
                <StudyCard key={i} index={i} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

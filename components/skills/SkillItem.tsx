import type { SkillItemData } from '@/lib/content/skills-data';
import { SkillIcon } from '@/components/icons/TechIcons';

export default function SkillItem({ skill }: { skill: SkillItemData }) {
  return (
    <li className="skill-chip">
      <span className="skill-chip-icon" aria-hidden="true">
        <SkillIcon name={skill.name} icon={skill.icon} />
      </span>
      <span>{skill.name}</span>
    </li>
  );
}

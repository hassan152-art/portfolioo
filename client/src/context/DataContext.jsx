import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../api';
import { fallbackExperiences, fallbackProjects, fallbackSkills } from '../data/fallback';

const DataContext = createContext(null);
export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [state, setState] = useState({
    projects: [],
    skills: [],
    experiences: [],
    loading: true,
    offline: false,
  });

  const refresh = useCallback(async () => {
    try {
      const [projects, skills, experiences] = await Promise.all([
        api.list('projects'),
        api.list('skills'),
        api.list('experiences'),
      ]);
      setState({ projects, skills, experiences, loading: false, offline: false });
    } catch {
      setState({
        projects: fallbackProjects,
        skills: fallbackSkills,
        experiences: fallbackExperiences,
        loading: false,
        offline: true,
      });
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return <DataContext.Provider value={{ ...state, refresh }}>{children}</DataContext.Provider>;
}

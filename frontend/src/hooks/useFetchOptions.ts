
import { useState, useEffect } from "react";
import api from "../api"

import { Group, ProgrammingLanguage } from "../types/types"

const useFetchOptions = () => {
  const [groups, setGroups] = useState<Group[]>([])
  const [proglangs, setProglangs] = useState<ProgrammingLanguage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const groupsResponse = await api.get("/groups")
        const proglangsResponse = await api.get("/proglangs")
        setGroups(groupsResponse.data)
        setProglangs(proglangsResponse.data)
      } catch (error) {
        console.error("Error fetching options:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchOptions()
  }, [])

  return { groups, proglangs, loading }
}

export default useFetchOptions
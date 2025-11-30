import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Github, Loader } from "lucide-react";

export function GitHubPush() {
  const [repoName, setRepoName] = useState("personality-blender");
  const [description, setDescription] = useState(
    "Interactive personality drink blender application"
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePush = async () => {
    if (!repoName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a repository name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/push-to-github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoName, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to push to GitHub");
      }

      toast({
        title: "Success!",
        description: `Repository created! Visit: ${data.repoUrl}`,
        duration: 5000,
      });

      // Open GitHub repo in new tab
      window.open(data.repoUrl, "_blank");
    } catch (error: any) {
      toast({
        title: "Failed to push to GitHub",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-background">
      <div className="flex items-center gap-2 mb-6">
        <Github className="w-6 h-6" />
        <h2 className="text-xl font-bold font-['Montserrat']">Push to GitHub</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Repository Name
          </label>
          <Input
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            placeholder="personality-blender"
            disabled={isLoading}
            data-testid="input-repo-name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Repository description"
            disabled={isLoading}
            data-testid="input-repo-description"
          />
        </div>

        <Button
          onClick={handlePush}
          disabled={isLoading}
          className="w-full font-['Montserrat'] font-semibold"
          data-testid="button-push-github"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Pushing...
            </>
          ) : (
            <>
              <Github className="w-4 h-4 mr-2" />
              Push to GitHub
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your code will be pushed to a new GitHub repository under your account
        </p>
      </div>
    </Card>
  );
}

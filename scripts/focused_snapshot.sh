#!/bin/bash

# Output directory
output_dir="snapshots"
mkdir -p "$output_dir"

# Function to create a tree-like structure of directories using ASCII characters
create_tree() {
    local dir="$1"
    local prefix="$2"
    local depth="$3"
    local maxdepth=3

    if [ "$depth" -ge "$maxdepth" ]; then
        return
    fi

    local files=("$dir"/*)
    local file
    local count=${#files[@]}
    local index=0

    for file in "${files[@]}"; do
        index=$((index + 1))
        if [ -d "$file" ]; then
            local name=$(basename "$file")
            if [[ "$name" != "node_modules" && "$name" != ".git" && "$name" != ".vscode" && "$name" != "$output_dir" ]]; then
                if [ $index -eq $count ]; then
                    echo "${prefix}+-- $name"
                    create_tree "$file" "$prefix    " $((depth + 1))
                else
                    echo "${prefix}+-- $name"
                    create_tree "$file" "$prefix|   " $((depth + 1))
                fi
            fi
        elif [ $index -eq $count ]; then
            echo "${prefix}+-- $(basename "$file")"
        else
            echo "${prefix}+-- $(basename "$file")"
        fi
    done
}

# Main execution
output_file="$output_dir/focused_project_snapshot.txt"
> "$output_file"
echo "Generating focused project snapshot..."

echo "Project Structure:" >> "$output_file"
if command -v tree &> /dev/null; then
    tree -L 3 -I "node_modules|.git|.vscode|$output_dir|config|docs|public|scripts|constants|context|styles|utils" --charset=ascii >> "$output_file"
else
    create_tree . "" 0 >> "$output_file"
fi

echo "" >> "$output_file"
echo "File Contents:" >> "$output_file"
total_lines=0

# Define the directories to include
include_dirs=(
    "./src/components/cards"
    "./src/components/decks"
    "./src/pages"
    "./src/types"
    "./src/services"
    "./src/hooks"
    "./specs"
    "./cypress/integration"
)

# Find and process relevant files
while IFS= read -r -d '' file; do
    echo "
File: $file
----------------------------------------" >> "$output_file"
    cat "$file" >> "$output_file"
    echo "----------------------------------------" >> "$output_file"
    lines=$(wc -l < "$file")
    total_lines=$((total_lines + lines))
done < <(find "${include_dirs[@]}" -type f \( -name "*.md" -o -name "*.feature" -o -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -print0)

echo "
Summary:
Total lines of relevant content: $total_lines" >> "$output_file"
echo "Focused project snapshot has been saved to $output_file"
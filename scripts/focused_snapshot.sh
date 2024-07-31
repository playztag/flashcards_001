#!/bin/bash

# Output directory
output_dir="snapshots"
mkdir -p "$output_dir"

# Function to display help message
show_help() {
    echo "Usage: $0 [OPTIONS] [COMPONENTS...]"
    echo
    echo "Generate snapshots of the project structure and file contents."
    echo
    echo "Options:"
    echo " -h, --help Show this help message and exit"
    echo " -c, --component COMPONENT Generate snapshot for a specific component"
    echo
    echo "Components:"
    echo " Specify one or more components to generate snapshots for specific parts of the project."
    echo " Available components: card_editor"
    echo
    echo "Examples:"
    echo " $0 -c card_editor # Generate snapshot for card_editor component"
}

# Function to list available components
list_components() {
    echo "Available components:"
    echo " - card_editor"
}

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
            if [[ "$name" != "node_modules" && "$name" != ".git" && "$name" != ".vscode" && "$name" != "venv" && "$name" != "$output_dir" ]]; then
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

# Function to generate snapshot for the card_editor component
generate_card_editor_snapshot() {
    local output_file="$output_dir/card_editor_snapshot.txt"
    > "$output_file"
    echo "Generating snapshot for card_editor component..."
    echo "Project Structure:" >> "$output_file"
    if command -v tree &> /dev/null; then
        tree -L 3 -I "node_modules|.git|.vscode|venv|$output_dir" src/components/cards src/types src/hooks src/context src/services src/pages >> "$output_file"
    else
        create_tree "src/components/cards" "" 0 >> "$output_file"
        create_tree "src/types" "" 0 >> "$output_file"
        create_tree "src/hooks" "" 0 >> "$output_file"
        create_tree "src/context" "" 0 >> "$output_file"
        create_tree "src/services" "" 0 >> "$output_file"
        create_tree "src/pages" "" 0 >> "$output_file"
    fi
    echo "" >> "$output_file"
    echo "File Contents:" >> "$output_file"
    total_lines=0
    while IFS= read -r -d '' file; do
        echo "
File: $file
----------------------------------------" >> "$output_file"
        cat "$file" >> "$output_file"
        echo "----------------------------------------" >> "$output_file"
        lines=$(wc -l < "$file")
        total_lines=$((total_lines + lines))
    done < <(find src/components/cards src/types src/hooks src/context src/services src/pages -type f \( -name "*.md" -o -name "*.feature" -o -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.html" -o -name "*.css" -o -name "*.scss" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/venv/*" -not -path "*/$output_dir/*" -print0)
    echo "
Summary:
Total lines of user-generated content: $total_lines" >> "$output_file"
    echo "Snapshot for card_editor component has been saved to $output_file"
}

# Main execution
if [ "$#" -eq 0 ]; then
    show_help
    exit 0
fi

components=()

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -c|--component)
            shift
            components+=("$1")
            shift
            ;;
        *)
            components+=("$1")
            shift
            ;;
    esac
done

for component in "${components[@]}"; do
    case $component in
        card_editor)
            generate_card_editor_snapshot
            ;;
        *)
            echo "Unknown component: $component"
            show_help
            exit 1
            ;;
    esac
done